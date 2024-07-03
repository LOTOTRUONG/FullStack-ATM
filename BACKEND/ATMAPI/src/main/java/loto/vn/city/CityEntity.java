package loto.vn.city;

import jakarta.persistence.*;
import lombok.*;
import loto.vn.country.CountryEntity;

@Entity
@Table(name = "city")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CityEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_city", unique = true)
    private Integer idCity;

    @Basic
    @Column(name = "name_city")
    private String nameCity;

    @Basic
    @Column(name = "postal_code")
    private Integer postalCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_country")
    private CountryEntity countryEntity;

}
