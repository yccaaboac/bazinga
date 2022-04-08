package clay.yccaaboac.modules.system.service.impl;

import clay.yccaaboac.modules.system.entity.User;
import clay.yccaaboac.modules.system.mapper.UserMapper;
import clay.yccaaboac.modules.system.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 系统用户 服务实现类
 * </p>
 *
 * @author Shelby
 * @since 2021-12-02
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

}
