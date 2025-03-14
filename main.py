from Function.DatabaseManipulate import CreateUser, LoginUser
from config import setupLog
import customtkinter as ctk
from Class.User import User

if __name__ == "__main__":
    setupLog()
    # ctk.set_appearance_mode("dark")
    # ctk.set_default_color_theme("blue")
    # app = ctk.CTk()
    # app.geometry("800x600")
    #
    # title = ctk.CTkLabel(app, text="Bienvenue sur BSC Messenger", font=("Arial",40))
    # title.pack(pady=20)
    #
    # registerFrame = ctk.CTkFrame(app)
    # registerFrame.configure(width=400, height=350)
    # registerFrame.pack_propagate(False)
    #
    # usernameLabel = ctk.CTkLabel(registerFrame, text="Entrer votre Username", font=("Arial",20))
    # usernameLabel.pack(pady=10)
    # usernameEntry = ctk.CTkEntry(registerFrame, placeholder_text="Votre Username", width=300)
    # usernameEntry.pack(pady=5)
    #
    # mdpLabel = ctk.CTkLabel(registerFrame, text="Entrer votre mot de passe", font=("Arial",20))
    # mdpLabel.pack(pady=10)
    # mdpEntry = ctk.CTkEntry(registerFrame, placeholder_text="Votre mot de passe", width=300)
    # mdpEntry.pack(pady=5)
    #
    # signInButton = ctk.CTkButton(registerFrame, text="Sign In !", command=lambda: LoginUser(usernameEntry.get(),mdpEntry.get()))
    # signInButton.pack(pady=20)
    #
    # signInButton = ctk.CTkButton(registerFrame, text="Sign Up !", command=lambda: CreateUser(usernameEntry.get(),mdpEntry.get()), font=("Ariel",10), width=100)
    # signInButton.pack(pady=20)
    #
    # registerFrame.pack(pady=20,padx=20)
    #
    # app.title("BSC Messenger")
    #
    # app.mainloop()

    user = User("Julien","Test")
    user.CreateKeyPair()

