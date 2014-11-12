package rewardsonline.accounts;

import java.math.BigDecimal;
import javax.persistence.ManyToOne;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
public class Beneficiary {

    @NotNull
    private String name;

    @DecimalMin("0")
    private BigDecimal savings;

    @ManyToOne
    private Account account;
}
