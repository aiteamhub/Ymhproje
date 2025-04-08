package com.healthylife.service;

import com.healthylife.model.Article;
import com.healthylife.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public Article createArticle(Article article) {
        article.setPublishedAt(LocalDateTime.now());
        return articleRepository.save(article);
    }

    public List<Article> getLatestArticles() {
        return articleRepository.findTop10ByOrderByPublishedAtDesc();
    }

    public List<Article> getArticlesByCategory(String category) {
        return articleRepository.findByCategoryOrderByPublishedAtDesc(category);
    }

    public List<Article> searchArticlesByTag(String tag) {
        return articleRepository.findByTagsContainingOrderByPublishedAtDesc(tag);
    }

    public Article getArticleById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found"));
    }

    public Article updateArticle(Article article) {
        if (!articleRepository.existsById(article.getId())) {
            throw new RuntimeException("Article not found");
        }
        return articleRepository.save(article);
    }

    public void deleteArticle(Long id) {
        articleRepository.deleteById(id);
    }
} 