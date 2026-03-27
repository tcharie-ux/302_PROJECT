package tg.ipnet.greenback.dto;

import java.time.LocalDateTime;
import java.util.List;

import tg.ipnet.greenback.entity.Modelisation_2D;
import tg.ipnet.greenback.entity.Utilisateur;

public class ProjetDto {
private String description;
private String nomProjet;
private boolean statut;
private LocalDateTime dateCreation;
private List<ValidationDto> validations;
private UtilisateurDto utilisateur;
private List<Modelisation_2DDto> modeles2D;
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
public List<ValidationDto> getValidations() {
    return validations;
}
public void setValidations(List<ValidationDto> validations) {
    this.validations = validations;
}
public UtilisateurDto getUtilisateur() {
    return utilisateur;
}
public void setUtilisateur(UtilisateurDto utilisateur) {
    this.utilisateur = utilisateur;
}
public List<Modelisation_2DDto> getModeles2D() {
    return modeles2D;
}
public void setModeles2D(List<Modelisation_2DDto> modeles2d) {
    modeles2D = modeles2d;
}
}
