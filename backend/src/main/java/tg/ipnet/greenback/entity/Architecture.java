package tg.ipnet.greenback.entity;

import org.springframework.data.annotation.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
@Entity
@Table(name="architecture")
@EntityListeners(EntityListeners.class)
public class Architecture {
    @Id
@GeneratedValue(strategy = GenerationType.SEQUENCE)
private int id;
private String fileName;
private String fileType;
@Lob
private byte[] data;
public int getId() {
    return id;
}
public void setId(int id) {
    this.id = id;
}
public String getFileName() {
    return fileName;
}
public void setFileName(String fileName) {
    this.fileName = fileName;
}
public String getFileType() {
    return fileType;
}
public void setFileType(String fileType) {
    this.fileType = fileType;
}
public byte[] getData() {
    return data;
}
public void setData(byte[] data) {
    this.data = data;
}
}
