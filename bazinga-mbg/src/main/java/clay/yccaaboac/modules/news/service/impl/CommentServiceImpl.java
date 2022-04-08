package clay.yccaaboac.modules.news.service.impl;

import clay.yccaaboac.modules.news.entity.Comment;
import clay.yccaaboac.modules.news.mapper.CommentMapper;
import clay.yccaaboac.modules.news.service.CommentService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 评论 服务实现类
 * </p>
 *
 * @author Shelby
 * @since 2021-12-02
 */
@Service
public class CommentServiceImpl extends ServiceImpl<CommentMapper, Comment> implements CommentService {

}
