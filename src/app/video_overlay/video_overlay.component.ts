import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import { MonaLisaComponent } from './mona_lisa/mona_lisa.component';
import { OlivesComponent } from './olives/olives.component';

import { ChatUserstate } from 'tmi.js';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../auth.service';

interface TwitchCommand {
    msg: string;
    'display-name': string;
    username: string;
    context: ChatUserstate;
}

const GRAVITY = 0.1;

export class Saturn {
    override: string;
    moving: boolean;
    x: number;
    y: number;
    xx: number;
    yy: number;

    destroyed: boolean;

    moveTimeout?: number;

    constructor(public maxWidth: number, public maxHeight: number, public onDestroy?: (saturn?: Saturn)=>any) {
        this.moving = false;
        this.x = 0;
        this.y = -20;
    }

    init() {
        this.moving = false;
        this.destroyed = false;

        this.x = 0;
        this.y = -20;

        this.xx = 0;
        this.yy = 0;
    }

    setPlan() {
        const width = (this.maxWidth * 3 + this.maxWidth * 7 * Math.random()) / 10;
        const height = (this.maxHeight * 5 + this.maxHeight * 5 * Math.random()) / 10;

        // // Min test
        // const width = this.maxWidth * 3 / 10;
        // const height = this.maxHeight * 5 / 10;

        // // Max test
        // const width = this.maxWidth;
        // const height = this.maxHeight;

        const t = 120;

        this.yy = height / t - (-GRAVITY * t / 2);

        this.xx = width / t / 2 || 2;
    }

    startMoving() {
        this.moving = true;
        this.move();
    }

    move() {
        if (!this.moving) {
            return;
        }

        if (this.y <= -60) {
            this.destroy();
            return;
        }

        this.y += this.yy;
        this.x += this.xx;

        this.yy -= GRAVITY;

        if (this.y > this.maxHeight) {
            this.y = this.maxHeight;
            if (this.yy > 0) {
                // this.yy = 0;
            }
        }

        if (this.x > this.maxWidth) {
            this.x = this.maxWidth;
            if (this.xx > 0) {
                this.xx = -this.xx;
            }
        }

        this.moveTimeout = window.setTimeout(() => {
            this.move();
        }, 1);
    }

    destroy() {
        clearTimeout(this.moveTimeout);

        this.destroyed = true;
        this.moving = false;

        if (this.onDestroy) {
            this.onDestroy(this);
        }
    }
}

export interface Msg {
    text: string;
    x: number;
    y: number;
    destroyed: boolean;
    font: string;
}

export interface Settings {
    font: 'random' | 'normal' | 'boing' | 'lumine hall';
    allowMsgsFromChat: boolean;
    allowMilkman: boolean;
    allowMonaLisa: boolean;
    allowOlives: boolean;
    allowRandomSprites: boolean;
    loopRandomSprites: boolean;
    
    additionalSaturns: number;
    loopCount: number;
    saturnsLimit: number;

    jumpScareTimestamp: number;
    
    volume: number;
    dynamicContentSize: number;
}

export interface SaturnData {
    msgText: string;
    saturn: Saturn;
}

@Component({
    selector: 'rr-video-overlay',
    templateUrl: './video_overlay.template.html',
    styleUrls: ['./video_overlay.style.scss']
})
export class VideoOverlayComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild("cheer", {static: true}) cheer: ElementRef<HTMLMediaElement>;

    @ViewChild('monaLisa') monaLisa: MonaLisaComponent;
    @ViewChild('olives') olives: OlivesComponent;

    lastSoundSeed: number = 0;

    lastPlayedSoundAt: number;

    settings: Settings;

    box: HTMLDivElement;

    @ViewChild('the_box') set boxRef(ref: ElementRef<HTMLDivElement>) {
        this.box = ref.nativeElement;
    }

    saturns: Saturn[];
    loopSaturns: Saturn[];
    msgs: Msg[];

    milkManTimeout: number;
    jumpScareTimeout: number;

    activeMilkMan: boolean = false;
    activeJumpScare: boolean = false;

    dark: boolean;

    saturnStack: SaturnData[] = [];

    chat: string;
    showChat: boolean;

    iframeSrc?: SafeUrl;
    imgSrc?: SafeUrl;

    mockTwitterContext?: ChatUserstate;

    uploadClearTimeout?: number;

    constructor(private domSanitizer: DomSanitizer, private authService: AuthService) {
    }

    ngOnInit() {
        (window as any).command = (msg: string) => {
            this.handleCommand(msg, {mod: false, subscriber: false});
        };

        (window as any).chat = () => {
            this.showChat = true;
            localStorage.setItem('chat', '1');
        };

        (window as any).dark = () => {
            this.dark = true;
            localStorage.setItem('dark', '1');
        };

        try {
            if (localStorage.getItem('dark')) {
                this.dark = true;
            }

            if (localStorage.getItem('dark')) {
                this.showChat = true;
            }
        }catch(error) {
            console.error(error);
        }

        this.saturns = [];
        this.msgs = [];

        this.settings = {
            font: 'normal',
            allowMsgsFromChat: false,
            allowMilkman: false,
            allowMonaLisa: false,
            allowOlives: false,
            allowRandomSprites: false,
            loopRandomSprites: false,
            
            additionalSaturns: 0,
            loopCount: 0,
            saturnsLimit: 5,

            jumpScareTimestamp: 0,

            volume: 0,
            dynamicContentSize: 1,
        };
    }

    initListeners() {
        firebase.firestore().collection("saturns").doc('settings').onSnapshot(docSnapshot => {
            const doc = docSnapshot.data() as Settings;

            if (doc) {
                this.settings = {
                    font: doc.font || 'normal',
                    allowMsgsFromChat: doc.allowMsgsFromChat || false,
                    allowMilkman: doc.allowMilkman || false,
                    allowMonaLisa: doc.allowMonaLisa || false,
                    allowOlives: doc.allowOlives || false,
                    allowRandomSprites: doc.allowRandomSprites || false,
                    loopRandomSprites: doc.loopRandomSprites || false,
                   
                    additionalSaturns: doc.additionalSaturns || 0,
                    loopCount: doc.loopCount || 0,
                    saturnsLimit: doc.saturnsLimit || 0,

                    jumpScareTimestamp: doc.jumpScareTimestamp || 0,

                    volume: doc.volume ?? 1,
                    dynamicContentSize: doc.dynamicContentSize ?? 1,
                };

                if (doc.loopCount) {
                    if (this.saturnStack.length < doc.loopCount) {
                        this.createSaturns(doc.loopCount - this.saturnStack.length);
                    }
                }

                if (!doc.allowOlives) { 
                    this.olives.clearOlives();
                }
            }
        });

        let skip = true;

        firebase.firestore().collection("saturns").doc('chat').onSnapshot(docSnapshot => {
            if (skip) {
                skip = false;
                return;
            }

            const doc = docSnapshot.data() as TwitchCommand;

            // console.log("Current data: ", docSnapshot.data());

            if (doc.username.toLowerCase() === 'streamlabs') {
                if (doc.msg.indexOf('raided') !== -1 || doc.msg.indexOf('cheer') !== -1 || doc.msg.indexOf('following') !== -1 || doc.msg.indexOf('hosted') !== -1 || doc.msg.indexOf('subscribed') !== -1) {
                    this.createSaturns(15);
                }
                return;
            }

            doc.context

            this.handleCommand(doc.msg || '', doc.context);
        });
    }

    // context: ChatUserstate
    public handleCommand(msg: string, context: {mod?: boolean, subscriber?: boolean}): void {
        const _msg = (msg || "").trim().toLowerCase();
        const _msgRaw = (msg || "").trim();

        // const context = doc && doc.context;
        // Handle commands

        const commands = _msg.split(' ');

        if (_msg === 'clear olives') {
            // console.log("cleared olives");
            this.olives.clearOlives();
            return;
        }

        const now = Date.now();

        if (context && (context.mod || context['user-id'] === '36547695')) {
            if (_msg === 'force jumpscare') {
                this.activateJumpScare();
                return;
            }

            if (_msgRaw.startsWith('iframe ')) {
                const _url = _msgRaw.split('iframe ')[1].trim();

                if (!_url || _url === 'clear') {
                    this.iframeSrc = undefined;
                } else {
                    this.iframeSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(_url);
                }

                this.imgSrc = undefined;

                // clearTimeout(this.uploadClearTimeout);

                // this.uploadClearTimeout = window.setTimeout(() => {
                //     this.imgSrc = undefined;
                //     this.iframeSrc = undefined;
                // }, 20 * 1000);
                
                return;
            }

            if (_msgRaw.startsWith('img ')) {
                const _url = _msgRaw.split('img ')[1].trim();

                if (!_url || _url === 'clear') {
                    this.imgSrc = undefined;
                } else {
                    this.imgSrc = this.domSanitizer.bypassSecurityTrustResourceUrl(_url);
                }

                this.iframeSrc = undefined;

                // clearTimeout(this.uploadClearTimeout);

                // this.uploadClearTimeout = window.setTimeout(() => {
                //     this.imgSrc = undefined;
                //     this.iframeSrc = undefined;
                // }, 20 * 1000);

                return;
            }

            if (_msg === 'cheer' || _msg === 'cheers' || _msg === 'cheered') {
                this.playCheer();
            }
        }

        if (context && (context.subscriber || context.mod || context['user-id'] === '36547695')) {
            if (_msg === 'cheer' || _msg === 'cheers' || _msg === 'cheered') {
                this.playCheer();
            }
        }

        // Time limit is handled by server for jump scare
        if (this.settings.jumpScareTimestamp && this.settings.jumpScareTimestamp < now) {
            for (let i = 0; i < commands.length; i++) {
                const command = commands[i];

                if (command === 'hate' || command === 'help' || command === 'dislike' || command === "don't" || command === "never" || command === "heart") {
                    this.activateJumpScare();
                    return;
                }
            }
        }

        for (let i = 0; i < commands.length; i++) {
            const command = commands[i] || "";
            const next = commands[i + 1] || "";

            // Olives
            if (this.settings.allowOlives && command.includes('olive')) {
                let oliveCount = 1;

                if (context && /x[0-9]+/.test(next)) {
                    // console.log(next);
                    oliveCount = +next.slice(1) || 0;

                    if (context) {
                        if (context.mod) {
                            // No limit
                        } else if (context.subscriber) {
                            if (oliveCount > 99) {
                                oliveCount = 99;
                            }
                        } else {
                            if (oliveCount > 9) {
                                oliveCount = 9;
                            }
                        }
                    } else {
                        if (oliveCount > 9) {
                            oliveCount = 9;
                        }
                    }
                }

                this.olives.pushOlives(oliveCount);
                break;
            // Facehugger
            } else if (this.settings && (command === 'art' || command === 'face' || command === 'hugger' || command === 'facehugger' || command === 'mona' || command === 'lisa' || command === 'monalisa')) {
                this.activateMonaLisa();
                break;
            } 
            // Milk
            else if (this.settings.allowMilkman && command.includes('milk')) {
                this.activateMilkMan();
                break;
            }
        }

        let seed = 0;
        if (this.settings.allowRandomSprites) {
            for (let char of _msg) {
                seed += char.charCodeAt(0);
            }
            seed = seed % 52 + 1;
        }
        
        let override = `assets/sprites/${seed}.gif`;

        if (this.settings.allowMsgsFromChat && _msg.length < 50) {
            this.createSaturn(msg, override);
        } else {
            this.createSaturn("", override);
        }

        // Create extra saturns for longer messages
        for (let i = 0; i < Math.floor((_msg.length / 30)); i++) {
            this.createSaturn();
        }

        if (this.settings.additionalSaturns) {
            for (let i = 0; i < this.settings.additionalSaturns; i++) {
                this.createSaturn();
            }
        }
    }

    ngAfterViewInit() {
        this.initListeners();

        this.createSaturn('BOING!');
        this.createSaturn();
        this.createSaturn();

        this.sendSaturns();

        if (this.authService.user) {
            console.log(this.authService.user);
            firebase.firestore().collection("contexts").doc(this.authService.user.uid).get().then(snapshot => {
                if (snapshot.exists) {
                    const data = snapshot.data();
                    console.log(data);
                    if (data) {
                        this.mockTwitterContext = data;
                    }
                }
            })
        }
    }

    activateMilkMan() {
        clearTimeout(this.milkManTimeout);
        
        this.activeMilkMan = true;

        this.milkManTimeout = window.setTimeout(() => {
            this.activeMilkMan = false;
        }, 2600);
    }

    public activateJumpScare(): void {
        clearTimeout(this.jumpScareTimeout);
        
        this.activeJumpScare = true;

        this.jumpScareTimeout = window.setTimeout(() => {
            this.activeJumpScare = false;
        }, 15 * 1000);
    }

    activateMonaLisa() {
        this.monaLisa.activate();
    }

    removeSaturn(removeSaturn: Saturn) {
        for (let i = 0; i <this.saturns.length; i++) {
            const saturn = this.saturns[i];

            if (saturn === removeSaturn) {
                this.saturns.splice(i, 1);
                break;
            }
        }

        // Endless loop
        if (this.saturnStack.length < this.settings.loopCount) {
            if (this.settings.loopRandomSprites) {
                this.createSaturns(this.settings.loopCount - this.saturnStack.length, true);
            } else {
                this.createSaturns(this.settings.loopCount - this.saturnStack.length);
            }
        }
    }

    createSaturns(count: number, randomOverride?: boolean) {
        for (let i = 0; i < count; i++) {
            if (randomOverride) {
                const seed = Math.floor(Math.random() * 52) + 1;
                let override = `assets/sprites/${seed}.gif`;

                this.createSaturn("", override);
            } else {
                this.createSaturn();
            }
        }
    }

    createSaturn(msgText?: string, override?: string) {
        // console.log(msgText);
        
        const maxHeight = (this.box && this.box.offsetHeight || 100) - 42;// 42 pixels for the size of the sprite
        const maxWidth = this.box && this.box.offsetWidth || 100;

        const onDestroy = (saturn: Saturn) => {
            this.removeSaturn(saturn);
        };

        const saturn: Saturn = new Saturn(maxWidth, maxHeight, onDestroy);

        saturn.override = override;

        this.saturnStack.unshift({
            saturn: saturn,
            msgText: msgText
        });
    }

    sendSaturns() {
        setTimeout(() => {
            this.sendSaturns();
        }, 200);

        // if (this.saturnStack.length) {
        //     console.log("sendSaturns stack size", this.saturnStack.length);
        // }

        if (!this.saturnStack.length || this.saturns.length >= this.settings.saturnsLimit) {
            return;
        }

        const saturnData = this.saturnStack.pop(); 

        const saturn = saturnData.saturn;
        const msgText = saturnData.msgText;
        
        this.saturns.push(saturn);

        saturn.setPlan();
        saturn.startMoving();

        if (msgText) {
            setTimeout(() => {
                this.createMsg(saturn, msgText);
            }, 500 + Math.floor(200 * Math.random()));
        }
    }

    createMsg(saturn: Saturn, msgText: string) {
        this.msgs.push({
            text: msgText,
            destroyed: false,
            x: saturn.x,
            y: saturn.y,
            font: this.settings.font
        });
    }
    
    removeMsg(removeMsg: Msg) {
        for (let i = 0; i <this.msgs.length; i++) {
            const msg = this.msgs[i];

            if (msg === removeMsg) {
                this.msgs.splice(i, 1);
                break;
            }
        }
    }

    public setChat(event: any): void {
        // console.log(event.target.value);
        this.chat = "" + event.target.value;
    }

    public submitChat(): void {
        this.handleCommand(this.chat, {mod: true, subscriber: true});
        this.chat = "";
    }

    public storeMsgInDatabase(): Promise<void> {
        return firebase.firestore().collection("saturns").doc('chat').set({
            timestamp: Date.now(),
            msg: this.chat || "",
            'display-name': this.mockTwitterContext && this.mockTwitterContext['display-name'] || 'unknown display-name',
            username: this.mockTwitterContext && this.mockTwitterContext.username || 'unknown username',
            context: this.mockTwitterContext || null,
        }).then(() => {
            this.chat = "";
        }).catch(error => {
            console.error(error);
        });
    }

    public playCheer(): void {
        this.cheer.nativeElement.currentTime = 0;
        this.cheer.nativeElement.volume = .4;
        this.cheer.nativeElement.play();

        this.createSaturns(6);
    }

    public ngOnDestroy(): void {
        clearTimeout(this.milkManTimeout);
        clearTimeout(this.jumpScareTimeout);
    }
}
