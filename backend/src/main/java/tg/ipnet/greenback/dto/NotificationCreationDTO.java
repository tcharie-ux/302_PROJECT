package tg.ipnet.greenback.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public class NotificationCreationDTO {

    @NotNull
    private UUID idDestinataire;

    @NotBlank
    private String message;

    public UUID getIdDestinataire() {
        return idDestinataire;
    }

    public void setIdDestinataire(UUID idDestinataire) {
        this.idDestinataire = idDestinataire;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
