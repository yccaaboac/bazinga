package clay.yccaaboac.modules.blog.service.impl;

import clay.yccaaboac.modules.blog.entity.Tag;
import clay.yccaaboac.modules.blog.mapper.TagMapper;
import clay.yccaaboac.modules.blog.service.TagService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 博客标签 服务实现类
 * </p>
 *
 * @author Shelby
 * @since 2021-12-01
 */
@Service
public class TagServiceImpl extends ServiceImpl<TagMapper, Tag> implements TagService {

}
