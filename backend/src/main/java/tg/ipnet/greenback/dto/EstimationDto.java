package tg.ipnet.greenback.dto;

import java.time.LocalDateTime;
import java.util.List;

import tg.ipnet.greenback.entity.LigneEstimation;
import tg.ipnet.greenback.entity.Modelisation_2D;

public class EstimationDto {
private float couts;
private LocalDateTime dateEstimation;
private List<LigneEstimationDto> lignes;
private Modelisation_2DDto modelisation2D;
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
public List<LigneEstimationDto> getLignes() {
    return lignes;
}
public void setLignes(List<LigneEstimationDto> lignes) {
    this.lignes = lignes;
}
public Modelisation_2DDto getModelisation2D() {
    return modelisation2D;
}
public void setModelisation2D(Modelisation_2DDto modelisation2d) {
    modelisation2D = modelisation2d;
}
}
