package tg.ipnet.greenback.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="administrateur")
@EntityListeners(EntityListeners.class)
public class Validation {
        @Id
@GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
private String commentaire;
private Boolean statut;
private LocalDateTime dateValidation;
@ManyToOne
private Projet projet;
public int getId() {
    return id;
}
public void setId(int id) {
    this.id = id;
}
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
