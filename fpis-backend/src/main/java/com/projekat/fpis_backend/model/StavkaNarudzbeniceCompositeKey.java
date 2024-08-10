package com.projekat.fpis_backend.model;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class StavkaNarudzbeniceCompositeKey implements Serializable {

    private Long brojNarudzbenice;
    private Integer redniBrojStavke;

    public StavkaNarudzbeniceCompositeKey() {}

    public StavkaNarudzbeniceCompositeKey(Long brojNarudzbenice, Integer redniBrojStavke) {
        this.brojNarudzbenice = brojNarudzbenice;
        this.redniBrojStavke = redniBrojStavke;
    }

    public Long getBrojNarudzbenice() {
        return brojNarudzbenice;
    }

    public void setBrojNarudzbenice(Long brojNarudzbenice) {
        this.brojNarudzbenice = brojNarudzbenice;
    }

    public Integer getRedniBrojStavke() {
        return redniBrojStavke;
    }

    public void setRedniBrojStavke(Integer redniBrojStavke) {
        this.redniBrojStavke = redniBrojStavke;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StavkaNarudzbeniceCompositeKey that = (StavkaNarudzbeniceCompositeKey) o;
        return Objects.equals(brojNarudzbenice, that.brojNarudzbenice) &&
                Objects.equals(redniBrojStavke, that.redniBrojStavke);
    }

    @Override
    public int hashCode() {
        return Objects.hash(brojNarudzbenice, redniBrojStavke);
    }
}
