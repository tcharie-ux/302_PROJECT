package tg.ipnet.greenback.dto;

import java.util.List;

public class Utilisateur {
private String nom;
private String prenom;
private String password;
private String email;
private int telephone;
private int role;
private List<Notification> notifications;
private List<Projet> projets;
public String getNom() {
    return nom;
}
public void setNom(String nom) {
    this.nom = nom;
}
public String getPrenom() {
    return prenom;
}
public void setPrenom(String prenom) {
    this.prenom = prenom;
}
public String getPassword() {
    return password;
}
public void setPassword(String password) {
    this.password = password;
}
public String getEmail() {
    return email;
}
public void setEmail(String email) {
    this.email = email;
}
public int getTelephone() {
    return telephone;
}
public void setTelephone(int telephone) {
    this.telephone = telephone;
}
public int getRole() {
    return role;
}
public void setRole(int role) {
    this.role = role;
}
public List<Notification> getNotifications() {
    return notifications;
}
public void setNotifications(List<Notification> notifications) {
    this.notifications = notifications;
}
public List<Projet> getProjets() {
    return projets;
}
public void setProjets(List<Projet> projets) {
    this.projets = projets;
}
}
