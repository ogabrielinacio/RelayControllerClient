import { Component } from '@angular/core';
import { EditEmailComponent } from "../../components/edit-email/edit-email.component";
import { ChangePasswordComponent } from "../../components/change-password/change-password.component";
import { AuthService } from '../../services/Auth/auth.service';
import { GetProfileResponse } from '../../models/User/Responses/get-profile-response.model';
import { Router } from '@angular/router';
import { EditNameComponent } from "../../components/edit-name/edit-name.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [EditEmailComponent, ChangePasswordComponent, EditNameComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  showEditEmailModal = false;
  showEditNameModal = false;
  showChangePasswordModal = false;
  showDeleteAccountModal = false;
  user: GetProfileResponse = { id: '', name: '', email: '' };

  constructor(private  authService:AuthService, private router: Router) {}

  ngOnInit(){
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.user.id = res?.data?.id;
        this.user.name = res?.data?.name;
        this.user.email = res?.data?.email;
      },
      error: (err) => {

      }
    });
  }

  closeModals() {
    this.showEditNameModal = false;
    this.showEditEmailModal = false;
    this.showChangePasswordModal = false;
    this.showDeleteAccountModal = false;
  }

  onEmailUpdated(newEmail: string) {
    this.authService.updateEmail(newEmail).subscribe({
      next: (res) => {
        if (res.success) {
          this.user.email = newEmail;
          this.closeModals();
        }
      }
    });
  }
  
  onNameUpdated(newName: string) {
    this.authService.updateName(newName).subscribe({
      next: (res) => {
        if (res.success) {
          this.user.name = newName;
          this.closeModals();
        }
      }
    });
  }

  onPasswordUpdated(data: { current: string; newPass: string }) {
    const request = {
      password: data.current,
      newPassword: data.newPass
    };

    this.authService.updatePassword(request).subscribe({
      next: (res) => {
        if (res.success) {
          this.closeModals();
          alert('Senha atualizada com sucesso!');
        }
      },
      error: (err) => {
        console.error('Erro ao trocar senha', err);
        alert('Erro ao atualizar senha. Verifique se a senha atual está correta.');
      }
    });
  }


  deleteAccount() {
    if (!confirm('Tem certeza que deseja deletar sua conta? Essa ação não poderá ser desfeita.')) return;
  
    this.authService.deleteAccount().subscribe({
      next: (res) => {
        if (res.success) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Erro ao deletar conta', err);
      }
    });
  }
  
}
