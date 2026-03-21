package tg.ipnet.greenback.dto;

import java.time.LocalDateTime;
import java.util.List;

public class Modelisation_2D {
private String nomModele;
private LocalDateTime dateCeation;
private String objet;
private Projet projet;
private List<ElementPlan> elements;
private Modelisation_3D modelisation3D;
private List<Estimation> estimations;
public String getNomModele() {
    return nomModele;
}
public void setNomModele(String nomModele) {
    this.nomModele = nomModele;
}
public LocalDateTime getDateCeation() {
    return dateCeation;
}
public void setDateCeation(LocalDateTime dateCeation) {
    this.dateCeation = dateCeation;
}
public String getObjet() {
    return objet;
}
public void setObjet(String objet) {
    this.objet = objet;
}
public Projet getProjet() {
    return projet;
}
public void setProjet(Projet projet) {
    this.projet = projet;
}
public List<ElementPlan> getElements() {
    return elements;
}
public void setElements(List<ElementPlan> elements) {
    this.elements = elements;
}
public Modelisation_3D getModelisation3D() {
    return modelisation3D;
}
public void setModelisation3D(Modelisation_3D modelisation3d) {
    modelisation3D = modelisation3d;
}
public List<Estimation> getEstimations() {
    return estimations;
}
public void setEstimations(List<Estimation> estimations) {
    this.estimations = estimations;
}

}
