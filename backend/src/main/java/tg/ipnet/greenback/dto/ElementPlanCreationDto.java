package tg.ipnet.greenback.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

public class ElementPlanCreationDto {

    @PositiveOrZero
    private float longueur;

    @PositiveOrZero
    private float epaisseur;

    @NotBlank
    private String type;

    @PositiveOrZero
    private float hauteur;

    private float positionX;

    private float positionY;

    public float getLongueur() {
        return longueur;
    }

    public void setLongueur(float longueur) {
        this.longueur = longueur;
    }

    public float getEpaisseur() {
        return epaisseur;
    }

    public void setEpaisseur(float epaisseur) {
        this.epaisseur = epaisseur;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public float getHauteur() {
        return hauteur;
    }

    public void setHauteur(float hauteur) {
        this.hauteur = hauteur;
    }

    public float getPositionX() {
        return positionX;
    }

    public void setPositionX(float positionX) {
        this.positionX = positionX;
    }

    public float getPositionY() {
        return positionY;
    }

    public void setPositionY(float positionY) {
        this.positionY = positionY;
    }
}
