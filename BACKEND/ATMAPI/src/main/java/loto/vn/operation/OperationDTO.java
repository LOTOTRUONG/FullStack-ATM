package loto.vn.operation;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class OperationDTO {
    @JsonProperty(index = 1)
    private Integer idOperation;
    @JsonProperty(index = 2)
    private Date dateOperation;
    @JsonProperty(index = 3)
    private Float amount;
    @JsonProperty(index = 4)
    private Integer idType;
    @JsonProperty(index = 5)
    private Integer idAccount;

    public OperationDTO(OperationEntity operationEntity){
        this.idOperation = operationEntity.getIdOperation();
        this.dateOperation = operationEntity.getDateOperation();
        this.amount = operationEntity.getAmountOperation();
        this.idType = operationEntity.getTypeOperation().getIdType();
        this.idAccount = operationEntity.getAccountOperation().getIdAccount();
    }
}
