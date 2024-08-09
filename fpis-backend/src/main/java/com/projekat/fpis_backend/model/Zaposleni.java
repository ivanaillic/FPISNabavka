package com.projekat.fpis_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "zaposleni")
public class Zaposleni {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sifra_zaposlenog")
    private Long sifraZaposlenog;

    @Column(name = "ime_prezime")
    private String imePrezime;

    public Zaposleni() {
    }

    public Zaposleni(Long sifraZaposlenog) {
        this.sifraZaposlenog = sifraZaposlenog;
    }

    public Long getSifraZaposlenog() {
        return sifraZaposlenog;
    }

    public void setSifraZaposlenog(Long sifraZaposlenog) {
        this.sifraZaposlenog = sifraZaposlenog;
    }

    public String getImePrezime() {
        return imePrezime;
    }

    public void setImePrezime(String imePrezime) {
        this.imePrezime = imePrezime;
    }
}
