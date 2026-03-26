package tg.ipnet.greenback.security.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tg.ipnet.greenback.security.NotificationService;
import tg.ipnet.greenback.security.dto.NotificationCreateDTO;
import tg.ipnet.greenback.security.dto.NotificationResponseDTO;

import java.util.List;

@Tag(name = "Notifications", description = "Gestion des notifications entre architecte et client")
@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationApi {

    private final NotificationService notificationService;

    public NotificationApi(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    @Operation(
            summary = "Envoyer une notification",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Notification envoyee"),
                    @ApiResponse(responseCode = "401", description = "Acces refuse")
            }
    )
    public ResponseEntity<NotificationResponseDTO> sendNotification(@RequestBody @Valid NotificationCreateDTO request) {
        return new ResponseEntity<>(notificationService.sendNotification(request), HttpStatus.CREATED);
    }

    @GetMapping("/received")
    @Operation(summary = "Lister les notifications recues")
    public ResponseEntity<List<NotificationResponseDTO>> getReceivedNotifications() {
        return ResponseEntity.ok(notificationService.getReceivedNotifications());
    }

    @GetMapping("/sent")
    @Operation(summary = "Lister les notifications envoyees")
    public ResponseEntity<List<NotificationResponseDTO>> getSentNotifications() {
        return ResponseEntity.ok(notificationService.getSentNotifications());
    }

    @PutMapping("/{notificationId}/accept")
    @Operation(summary = "Accepter une notification")
    public ResponseEntity<NotificationResponseDTO> acceptNotification(@PathVariable Long notificationId) {
        return ResponseEntity.ok(notificationService.acceptNotification(notificationId));
    }
}
