package clay.yccaaboac.modules.system.service.impl;

import clay.yccaaboac.modules.system.entity.Job;
import clay.yccaaboac.modules.system.mapper.JobMapper;
import clay.yccaaboac.modules.system.service.JobService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 岗位 服务实现类
 * </p>
 *
 * @author Shelby
 * @since 2021-12-02
 */
@Service
public class JobServiceImpl extends ServiceImpl<JobMapper, Job> implements JobService {

}
