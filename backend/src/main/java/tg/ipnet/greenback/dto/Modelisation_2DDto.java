package tg.ipnet.greenback.dto;

import java.time.LocalDateTime;
import java.util.List;

import tg.ipnet.greenback.entity.ElementPlan;
import tg.ipnet.greenback.entity.Estimation;
import tg.ipnet.greenback.entity.Modelisation_3D;
import tg.ipnet.greenback.entity.Projet;

public class Modelisation_2DDto {
private String nomModele;
private LocalDateTime dateCeation;
private String objet;
private ProjetDto projet;
private List<ElementPlanDto> elements;
private Modelisation_3DDto modelisation3D;
private List<EstimationDto> estimations;
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
public ProjetDto getProjet() {
    return projet;
}
public void setProjet(ProjetDto projet) {
    this.projet = projet;
}
public List<ElementPlanDto> getElements() {
    return elements;
}
public void setElements(List<ElementPlanDto> elements) {
    this.elements = elements;
}
public Modelisation_3DDto getModelisation3D() {
    return modelisation3D;
}
public void setModelisation3D(Modelisation_3DDto modelisation3d) {
    modelisation3D = modelisation3d;
}
public List<EstimationDto> getEstimations() {
    return estimations;
}
public void setEstimations(List<EstimationDto> estimations) {
    this.estimations = estimations;
}

}
