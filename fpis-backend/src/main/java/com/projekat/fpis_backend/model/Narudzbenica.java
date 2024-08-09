package com.projekat.fpis_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "narudzbenica")
public class Narudzbenica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "broj_narudzbenice")
    private Long brojNarudzbenice;

    @Enumerated(EnumType.STRING)
    @Column(name = "status_narudzbenice")
    private Status statusNarudzbenice;

    @Column(name = "datum_narucivanja")
    private LocalDate datumNarucivanja;

    @Column(name = "rok_isporuke")
    private LocalDate rokIsporuke;

    @Column(name = "ukupno_naruceno")
    private Double ukupnoNaruceno;

    @ManyToOne()
    @JoinColumn(name = "jmbg_zaposlenog", referencedColumnName = "jmbg")
    private Zaposleni zaposleni;

    @ManyToOne()
    @JoinColumn(name = "pib_dobavljaca", referencedColumnName = "pib_dobavljaca")
    private Dobavljac dobavljac;

    @Column(name = "napomena")
    private String napomena;

   // @OneToMany(mappedBy = "narudzbenica", cascade = CascadeType.ALL, orphanRemoval = true)
   // @JsonIgnoreProperties("narudzbenica")
   // private List<StavkaNarudzbenice> stavkeNarudzbenice = new ArrayList<>();

    @OneToMany(mappedBy = "narudzbenica", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<StavkaNarudzbenice> stavkeNarudzbenice = new ArrayList<>();


    public Long getBrojNarudzbenice() {
        return brojNarudzbenice;
    }

    public void setBrojNarudzbenice(Long brojNarudzbenice) {
        this.brojNarudzbenice = brojNarudzbenice;
    }

    public Status getStatusNarudzbenice() {
        return statusNarudzbenice;
    }

    public void setStatusNarudzbenice(Status statusNarudzbenice) {
        this.statusNarudzbenice = statusNarudzbenice;
    }

    public LocalDate getDatumNarucivanja() {
        return datumNarucivanja;
    }

    public void setDatumNarucivanja(LocalDate datumNarucivanja) {
        this.datumNarucivanja = datumNarucivanja;
    }

    public LocalDate getRokIsporuke() {
        return rokIsporuke;
    }

    public void setRokIsporuke(LocalDate rokIsporuke) {
        this.rokIsporuke = rokIsporuke;
    }

    public Double getUkupnoNaruceno() {
        return ukupnoNaruceno;
    }

    public void setUkupnoNaruceno(Double ukupnoNaruceno) {
        this.ukupnoNaruceno = ukupnoNaruceno;
    }

    public Zaposleni getZaposleni() {
        return zaposleni;
    }

    public void setZaposleni(Zaposleni zaposleni) {
        this.zaposleni = zaposleni;
    }

    public Dobavljac getDobavljac() {
        return dobavljac;
    }

    public void setDobavljac(Dobavljac dobavljac) {
        this.dobavljac = dobavljac;
    }

    public String getNapomena() {
        return napomena;
    }

    public void setNapomena(String napomena) {
        this.napomena = napomena;
    }

    public List<StavkaNarudzbenice> getStavkeNarudzbenice() {
        return stavkeNarudzbenice;
    }

    public void setStavkeNarudzbenice(List<StavkaNarudzbenice> stavkeNarudzbenice) {
        this.stavkeNarudzbenice = stavkeNarudzbenice;
    }
}
