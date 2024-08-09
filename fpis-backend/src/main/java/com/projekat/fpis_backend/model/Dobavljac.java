package com.projekat.fpis_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "dobavljac")
public class Dobavljac {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pib_dobavljaca")
    private Long pibDobavljaca;

    @Column(name = "naziv_dobavljaca")
    private String nazivDobavljaca;

    @Column(name = "telefon")
    private String telefon;

    @Email
    @Column(name = "email_dobavljaca")
    private String emailDobavljaca;

    @NotBlank
    @Column(name = "tekuci_racun")
    private String tekuciRacun;

    @ManyToOne
    @JoinColumn(name = "ptt", referencedColumnName = "ptt")
    private Grad grad;

  //  @OneToMany(mappedBy = "dobavljac", cascade = CascadeType.ALL)
   // private List<Narudzbenica> narudzbenice;

    @OneToMany(mappedBy = "dobavljac", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Narudzbenica> narudzbenice;

    public Long getPibDobavljaca() {
        return pibDobavljaca;
    }

    public void setPibDobavljaca(Long pibDobavljaca) {
        this.pibDobavljaca = pibDobavljaca;
    }

    public String getNazivDobavljaca() {
        return nazivDobavljaca;
    }

    public void setNazivDobavljaca(String nazivDobavljaca) {
        this.nazivDobavljaca = nazivDobavljaca;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getEmailDobavljaca() {
        return emailDobavljaca;
    }

    public void setEmailDobavljaca(String emailDobavljaca) {
        this.emailDobavljaca = emailDobavljaca;
    }

    public String getTekuciRacun() {
        return tekuciRacun;
    }

    public void setTekuciRacun(String tekuciRacun) {
        this.tekuciRacun = tekuciRacun;
    }

    public Grad getGrad() {
        return grad;
    }

    public void setGrad(Grad grad) {
        this.grad = grad;
    }

    public List<Narudzbenica> getNarudzbenice() {
        return narudzbenice;
    }

    public void setNarudzbenice(List<Narudzbenica> narudzbenice) {
        this.narudzbenice = narudzbenice;
    }
}
