package com.projekat.fpis_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "stavka_narudzbenice")
public class StavkaNarudzbenice {

    @EmbeddedId
    private StavkaNarudzbeniceCompositeKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("brojNarudzbenice")
    @JoinColumn(name = "broj_narudzbenice", insertable = false, updatable = false)
    @JsonBackReference
    private Narudzbenica narudzbenica;

    @Column(name = "kolicina")
    private Double kolicina;

    @Column(name = "opis")
    private String opis;

    @ManyToOne()
    @JoinColumn(name = "sifra_materijala", referencedColumnName = "sifra_materijala")
    private Materijal materijal;

    public StavkaNarudzbenice() {
        this.id = new StavkaNarudzbeniceCompositeKey();
    }

    public StavkaNarudzbeniceCompositeKey getId() {
        return id;
    }

    public void setId(StavkaNarudzbeniceCompositeKey id) {
        this.id = id;
    }

    public Narudzbenica getNarudzbenica() {
        return narudzbenica;
    }

    public void setNarudzbenica(Narudzbenica narudzbenica) {
        this.narudzbenica = narudzbenica;
    }

    public Double getKolicina() {
        return kolicina;
    }

    public void setKolicina(Double kolicina) {
        this.kolicina = kolicina;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public Materijal getMaterijal() {
        return materijal;
    }

    public void setMaterijal(Materijal materijal) {
        this.materijal = materijal;
    }
}
