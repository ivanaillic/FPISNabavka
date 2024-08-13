package com.projekat.fpis_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "grad")
public class Grad {

    @Id
    @NotNull
    @Column(name = "ptt")
    private Long ptt;
    @Size(max = 50)
    @Column(name = "naziv_grada")
    private String nazivGrada;

    public Grad() {
    }

    public Grad(Long ptt) {
        this.ptt = ptt;
    }

    public Long getPtt() {
        return ptt;
    }

    public void setPtt(Long ptt) {
        this.ptt = ptt;
    }

    public String getNazivGrada() {
        return nazivGrada;
    }

    public void setNazivGrada(String nazivGrada) {
        this.nazivGrada = nazivGrada;
    }
}
