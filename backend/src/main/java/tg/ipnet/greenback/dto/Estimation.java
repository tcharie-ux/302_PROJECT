package tg.ipnet.greenback.dto;

import java.time.LocalDateTime;
import java.util.List;

public class Estimation {
private float couts;
private LocalDateTime dateEstimation;
private List<LigneEstimation> lignes;
private Modelisation_2D modelisation2D;
public float getCouts() {
    return couts;
}
public void setCouts(float couts) {
    this.couts = couts;
}
public LocalDateTime getDateEstimation() {
    return dateEstimation;
}
public void setDateEstimation(LocalDateTime dateEstimation) {
    this.dateEstimation = dateEstimation;
}
public List<LigneEstimation> getLignes() {
    return lignes;
}
public void setLignes(List<LigneEstimation> lignes) {
    this.lignes = lignes;
}
public Modelisation_2D getModelisation2D() {
    return modelisation2D;
}
public void setModelisation2D(Modelisation_2D modelisation2d) {
    modelisation2D = modelisation2d;
}
}
