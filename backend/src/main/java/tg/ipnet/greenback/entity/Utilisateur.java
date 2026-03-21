package tg.ipnet.greenback.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import tg.ipnet.greenback.enums.Role;

@Entity
@Table(name="administrateur")
@EntityListeners(EntityListeners.class)
public class Utilisateur {
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE)
private int id;
private String nom;
private String prenom;
private String password;
private String email;
private int telephone;
private Role role;
@OneToMany(mappedBy = "utilisateur")
private List<Projet> projets;
@OneToMany(mappedBy = "utilisateur")
private List<Notification> notifications;
public int getId() {
    return id;
}
public void setId(int id) {
    this.id = id;
}
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
public Role getRole() {
    return role;
}
public void setRole(Role role) {
    this.role = role;
}
public List<Projet> getProjets() {
    return projets;
}
public void setProjets(List<Projet> projets) {
    this.projets = projets;
}
public List<Notification> getNotifications() {
    return notifications;
}
public void setNotifications(List<Notification> notifications) {
    this.notifications = notifications;
}

}
