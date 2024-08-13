package com.projekat.fpis_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "materijal")
public class Materijal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sifra_materijala")
    private Long sifraMaterijala;

    @Column(name = "naziv_materijala")
    private String nazivMaterijala;

    @Column(name = "cena")
    private double cena;

    @Column(name = "jedinica_mere")
    private String jedinicaMere;

    @OneToMany(mappedBy = "materijal", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<StavkaNarudzbenice> stavkeNarudzbenice;


    public Materijal() {}

    public Materijal(Long sifraMaterijala, String nazivMaterijala, double cena, String jedinicaMere) {
        this.sifraMaterijala = sifraMaterijala;
        this.nazivMaterijala = nazivMaterijala;
        this.cena = cena;
        this.jedinicaMere = jedinicaMere;
    }

    public Long getSifraMaterijala() {
        return sifraMaterijala;
    }

    public void setSifraMaterijala(Long sifraMaterijala) {
        this.sifraMaterijala = sifraMaterijala;
    }

    public String getNazivMaterijala() {
        return nazivMaterijala;
    }

    public void setNazivMaterijala(String nazivMaterijala) {
        this.nazivMaterijala = nazivMaterijala;
    }

    public double getCena() {
        return cena;
    }

    public void setCena(double cena) {
        this.cena = cena;
    }

    public String getJedinicaMere() {
        return jedinicaMere;
    }

    public void setJedinicaMere(String jedinicaMere) {
        this.jedinicaMere = jedinicaMere;
    }

    public List<StavkaNarudzbenice> getStavkeNarudzbenice() {
        return stavkeNarudzbenice;
    }

    public void setStavkeNarudzbenice(List<StavkaNarudzbenice> stavkeNarudzbenice) {
        this.stavkeNarudzbenice = stavkeNarudzbenice;
    }
}
