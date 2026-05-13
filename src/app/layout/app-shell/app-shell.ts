import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Topbar } from "../topbar/topbar";
import { Sidebar } from "../sidebar/sidebar";
@Component({
    selector: 'app-shell',
    templateUrl: './app-shell.html',
    standalone:true,
    styleUrl: './app-shell.scss',
    imports: [RouterOutlet,Topbar,Sidebar]
})
export class AppShell{}