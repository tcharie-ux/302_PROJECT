package tg.ipnet.greenback.dto;

import java.time.LocalDateTime;
import java.util.List;

public class Projet {
private String description;
private String nomProjet;
private boolean statut;
private LocalDateTime dateCreation;
private List<Validation> validations;
private Utilisateur utilisateur;
private List<Modelisation_2D> modeles2D;
public String getDescription() {
    return description;
}
public void setDescription(String description) {
    this.description = description;
}
public String getNomProjet() {
    return nomProjet;
}
public void setNomProjet(String nomProjet) {
    this.nomProjet = nomProjet;
}
public boolean isStatut() {
    return statut;
}
public void setStatut(boolean statut) {
    this.statut = statut;
}
public LocalDateTime getDateCreation() {
    return dateCreation;
}
public void setDateCreation(LocalDateTime dateCreation) {
    this.dateCreation = dateCreation;
}
public List<Validation> getValidations() {
    return validations;
}
public void setValidations(List<Validation> validations) {
    this.validations = validations;
}
public Utilisateur getUtilisateur() {
    return utilisateur;
}
public void setUtilisateur(Utilisateur utilisateur) {
    this.utilisateur = utilisateur;
}
public List<Modelisation_2D> getModeles2D() {
    return modeles2D;
}
public void setModeles2D(List<Modelisation_2D> modeles2d) {
    modeles2D = modeles2d;
}
}
