package loto.vn.country;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CountryDTO {
    @JsonProperty(index = 1)
    private Integer idCountry;
    @JsonProperty(index = 2)
    private String nameCountry;

    public CountryDTO(CountryEntity countryEntity){
        this.idCountry = countryEntity.getIdCountry();
        this.nameCountry = countryEntity.getNameCountry();
    }

    public List<CountryDTO> toDtoList (List<CountryEntity> countryEntities){
        List<CountryDTO> countryDTOS = new ArrayList<CountryDTO>();
        for (CountryEntity country : countryEntities){
            countryDTOS.add(new CountryDTO(country));
        }
        return countryDTOS;
    }
}
