package clay.yccaaboac.modules.system.service.impl;

import clay.yccaaboac.modules.system.entity.Log;
import clay.yccaaboac.modules.system.mapper.LogMapper;
import clay.yccaaboac.modules.system.service.LogService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 系统日志 服务实现类
 * </p>
 *
 * @author Shelby
 * @since 2021-12-02
 */
@Service
public class LogServiceImpl extends ServiceImpl<LogMapper, Log> implements LogService {

}
