import { AuthService } from './../../services/Auth/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBoardService } from '../../services/UserBoard/user-board.service';
import { AddDeviceComponent } from '../../components/add-device/add-device.component';
import { RouterModule } from '@angular/router';
import { InviteUserComponent } from '../../components/invite-user/invite-user.component';
import { EditNicknameComponent } from '../../components/edit-nickname/edit-nickname.component';
import { ConfirmDialogComponent } from "../../components/confirm-dialog/confirm-dialog.component";
import { Router } from '@angular/router';
import { RoleTranslatePipe } from "../../pipes/role-translate.pipe";
import { AddBoardRequest } from '../../models/UserBoard/Requests/add-board-request.model';
import { AddUserToDeviceRequest } from '../../models/UserBoard/Requests/add-user-to-device-request.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AddDeviceComponent,
    RouterModule,
    InviteUserComponent,
    EditNicknameComponent,
    ConfirmDialogComponent,
    RoleTranslatePipe
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  boards: any[] = [];
  controllerId: string = '';
  showModal: boolean = false;
  inviteBoardId: string | null = null;
  renameBoardId: string | null = null;
  renameCurrentName: string = '';
  confirmBoardId: string | null = null;

  constructor(private userBoardService: UserBoardService, private  authService:AuthService  ,private router: Router) {}

  ngOnInit(): void {
    this.userBoardService.getAll().subscribe({
      next: (res) => {
        this.boards = res?.data?.boards ?? [];
      },
    });
  }

  logout(): void {
    this.authService.logout;
  }

  startRemove(board: any): void {
    this.confirmBoardId = board.relayControllerBoardId;
  }
  
  handleRemoveConfirmed(): void {
    if (!this.confirmBoardId) return;
  
    // this.userBoardService.removeBoard(this.confirmBoardId).subscribe(() => {
    //   this.confirmBoardId = null;
    //   this.ngOnInit();
    // });
  }
  
  cancelRemove(): void {
    this.confirmBoardId = null;
  }

  selectBoard(id: string): void {
    this.controllerId = id;
  }

  startRename(board: any): void {
    this.renameBoardId = board.relayControllerBoardId;
    this.renameCurrentName = board.customName;
  }

  handleRename(): void {
    this.renameBoardId = null;
    this.ngOnInit();
  }

  startInvite(board: any): void {
    this.inviteBoardId = board.relayControllerBoardId;
  }

  removeBoard(board: any): void {
    if (confirm('Tem certeza que deseja remover essa placa?')) {
    }
  }
}
