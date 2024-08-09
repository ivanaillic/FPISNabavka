package com.projekat.fpis_backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "zaposleni")
public class Zaposleni {

    @Id
    @NotNull
    @Size(min = 13, max = 13)
    @Column(name = "jmbg")
    private String jmbg;

    @Column(name = "ime_prezime")
    private String imePrezime;

   // @OneToMany(mappedBy = "zaposleni", cascade = CascadeType.ALL)
   // private List<Narudzbenica> narudzbenice;

    @OneToMany(mappedBy = "zaposleni", cascade = CascadeType.ALL)
    @JsonBackReference
    private List<Narudzbenica> narudzbenice;

    public Zaposleni() {
    }

    public Zaposleni(String jmbg) {
        this.jmbg = jmbg;
    }

    public String getJmbg() {
        return jmbg;
    }

    public void setJmbg(String jmbg) {
        this.jmbg = jmbg;
    }

    public String getImePrezime() {
        return imePrezime;
    }

    public void setImePrezime(String imePrezime) {
        this.imePrezime = imePrezime;
    }

    public List<Narudzbenica> getNarudzbenice() {
        return narudzbenice;
    }

    public void setNarudzbenice(List<Narudzbenica> narudzbenice) {
        this.narudzbenice = narudzbenice;
    }
}
