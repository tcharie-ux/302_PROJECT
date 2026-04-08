package tg.ipnet.greenback.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class ProjetCreationDto {

    @NotBlank
    private String nomProjet;

    @NotBlank
    private String description;

    @Email
    private String emailArchitecte;

    public String getNomProjet() {
        return nomProjet;
    }

    public void setNomProjet(String nomProjet) {
        this.nomProjet = nomProjet;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEmailArchitecte() {
        return emailArchitecte;
    }

    public void setEmailArchitecte(String emailArchitecte) {
        this.emailArchitecte = emailArchitecte;
    }
}
