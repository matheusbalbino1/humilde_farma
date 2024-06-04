from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required

app = Blueprint('auth', __name__)

login_manager = LoginManager()

# Exemplo de modelo de usuário (substitua com seu próprio)
class User(UserMixin):
    def __init__(self, username, password):
        self.username = username
        self.password = password

# Exemplo de banco de dados de usuários (substitua com sua própria lógica de armazenamento)
users = {'user': User('user', 'password')}

@login_manager.user_loader
def load_user(user_id):
    return users.get(user_id)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = users.get(username)
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('profile'))
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('home'))

@app.route('/profile')
@login_required
def profile():
    return f'Bem-vindo, {current_user.username}'
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
def enviar_email_reset_senha(email, token):
    # Configuração do servidor SMTP
    smtp_host = 'smtp.gmail.com'
    smtp_port = 587
    smtp_user = 'seu_email@gmail.com'  # Substitua pelo seu endereço de e-mail
    smtp_password = 'sua_senha'  # Substitua pela sua senha do Gmail

    # Construindo o e-mail
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = email
    msg['Subject'] = 'Redefinição de senha'

    # Corpo do e-mail
    mensagem = f"""
    Olá,

    Você solicitou uma redefinição de senha para a sua conta.
    Clique no link abaixo para redefinir sua senha:
    http://seusite.com/redefinir_senha?token={token}

    Se você não solicitou uma redefinição de senha, ignore este e-mail.

    Atenciosamente,
    Humilde farma
    """
    msg.attach(MIMEText(mensagem, 'plain'))

    # Conexão com o servidor SMTP
    server = smtplib.SMTP(smtp_host, smtp_port)
    server.starttls()
    server.login(smtp_user, smtp_password)

    # Envio do e-mail
    server.sendmail(smtp_user, email, msg.as_string())
    server.quit()
