import {Injectable, signal,effect} from '@angular/core';
export type ThemeMode = 'dark' | 'light';


@Injectable({ providedIn : 'root'})
export class ThemeService{
    mode = signal<ThemeMode>
    ((localStorage.getItem('mp-theme')as ThemeMode)?? 'dark');

    constructor(){
        effect(()=>{
            const m = this.mode();
            document.body.classList.toggle('light',m === 'light');
            localStorage.setItem('mp-theme',m);
        });
    }
    toggle(): void{
        this.mode.set(this.mode() === 'dark'? 'light' : 'dark');
    }
}