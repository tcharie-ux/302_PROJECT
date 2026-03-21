package tg.ipnet.greenback.dto;

import java.util.List;

public class LigneEstimation {
private int quantter;
private float prixTotal;
private List<LigneEstimation> lignes;
private Materiaux materiau;
public int getQuantter() {
    return quantter;
}
public void setQuantter(int quantter) {
    this.quantter = quantter;
}
public float getPrixTotal() {
    return prixTotal;
}
public void setPrixTotal(float prixTotal) {
    this.prixTotal = prixTotal;
}
public List<LigneEstimation> getLignes() {
    return lignes;
}
public void setLignes(List<LigneEstimation> lignes) {
    this.lignes = lignes;
}
public Materiaux getMateriau() {
    return materiau;
}
public void setMateriau(Materiaux materiau) {
    this.materiau = materiau;
}
}
