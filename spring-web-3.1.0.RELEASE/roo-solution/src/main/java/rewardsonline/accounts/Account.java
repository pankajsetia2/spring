package rewardsonline.accounts;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.tostring.RooToString;

@RooJavaBean
@RooToString
@RooJpaActiveRecord
public class Account {

    @NotNull
    private String name;

    @Column(unique = true)
    private String number;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Beneficiary> beneficiaries = new HashSet<Beneficiary>();
}
