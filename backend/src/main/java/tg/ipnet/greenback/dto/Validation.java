package tg.ipnet.greenback.dto;

import java.time.LocalDateTime;

public class Validation {
private String commentaire;
private Boolean statut;
private LocalDateTime dateValidation;
private Projet projet;

public String getCommentaire() {
    return commentaire;
}
public void setCommentaire(String commentaire) {
    this.commentaire = commentaire;
}
public Boolean getStatut() {
    return statut;
}
public void setStatut(Boolean statut) {
    this.statut = statut;
}
public LocalDateTime getDateValidation() {
    return dateValidation;
}
public void setDateValidation(LocalDateTime dateValidation) {
    this.dateValidation = dateValidation;
}
public Projet getProjet() {
    return projet;
}
public void setProjet(Projet projet) {
    this.projet = projet;
}

}
