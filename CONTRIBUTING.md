# Contributing to BridgeTalk

Thank you for your interest in contributing to BridgeTalk! We welcome contributions from everyone, and we appreciate your help in making this project better.

## Code of Conduct

Please be respectful and constructive in all interactions. We are committed to providing a welcoming and inclusive environment for all contributors.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. Check if the issue already exists
2. Provide a clear description of the problem
3. Include steps to reproduce for bugs
4. Mention your environment (browser, OS, assistive technology)

### Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/bridgetalk.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes: `npm run test`
6. Commit with clear messages: `git commit -m "Description of changes"`
7. Push to your fork: `git push origin feature/your-feature-name`
8. Open a Pull Request

### Development Guidelines

#### Code Style
- Follow the Prettier configuration
- Use ESLint rules
- Run `npm run format` before committing

#### TypeScript
- Use TypeScript for all new code
- Define proper types
- Avoid `any` type when possible

#### Accessibility
- All components must be accessible
- Follow WCAG 2.1 AAA guidelines
- Include ARIA labels where necessary
- Test with screen readers

#### Testing
- Write unit tests for new features
- Aim for >80% code coverage
- Include integration tests for complex features
- Test accessibility features

#### Commits
```bash
# Good commit messages
git commit -m "feat: add voice message support"
git commit -m "fix: resolve chat message scrolling issue"
git commit -m "docs: update accessibility guide"
git commit -m "test: add tests for message simplification"

# Use conventional commits:
# feat: new feature
# fix: bug fix
# docs: documentation
# style: code style
# refactor: code refactor
# test: tests
# chore: maintenance
```

## Development Setup

### Install Dependencies
```bash
npm install
```

### Environment Setup
```bash
cp .env.example .env.local
# Fill in your Firebase credentials
```

### Run Development Server
```bash
npm run dev
```

### Run Tests
```bash
npm run test
npm run test:coverage
```

### Check Code Quality
```bash
npm run lint
npm run format
npm run type-check
```

## Testing Requirements

### Unit Tests
- Test utility functions
- Test components in isolation
- Minimum 80% coverage

### Integration Tests
- Test Firebase interactions
- Test voice features
- Test AI features

### Accessibility Tests
- Test keyboard navigation
- Test with screen readers
- Verify color contrast
- Check focus management

### E2E Tests
- Test complete user flows
- Test chat workflow
- Test voice input/output
- Test on mobile devices

## Pull Request Process

1. **Update your branch** with the latest main branch
2. **Run tests** and ensure they pass
3. **Run linter** and fix any issues
4. **Create a clear PR description**:
   - What does it do?
   - Why is it needed?
   - How is it tested?
   - Any breaking changes?

5. **Link related issues**: Use `fixes #123`

6. **Wait for review**:
   - Respond to feedback
   - Make requested changes
   - Re-request review

## Code Review Guidelines

### For Contributors
- Respond promptly to feedback
- Ask clarifying questions
- Be open to suggestions
- Thank reviewers

### For Reviewers
- Be constructive and kind
- Explain your suggestions
- Suggest improvements, don't demand
- Approve when satisfied

## Documentation

### Code Comments
```typescript
/**
 * Generate a simplified version of text
 * @param text - The original text
 * @param maxLength - Maximum length of simplified text
 * @returns Promise<string> - The simplified text
 */
export async function simplifyText(
  text: string,
  maxLength?: number
): Promise<string> {
  // Implementation
}
```

### README Updates
- Update README.md for new features
- Add examples for new functionality
- Include accessibility notes

## Accessibility Contributions

Special focus on:
- Screen reader testing
- Keyboard navigation
- Color contrast
- ARIA labels
- Touch targets (44x44px minimum)
- Focus management

## Performance

- Monitor bundle size
- Test on slow networks
- Profile performance
- Optimize critical paths

## Security

- No hardcoded secrets
- Validate all inputs
- Sanitize output
- Follow security best practices
- Report security issues privately

## Questions?

- Check existing documentation
- Search GitHub issues
- Ask in PR comments
- Email: dev@bridgetalk.app

## Recognition

Contributors will be recognized in:
- README.md
- CONTRIBUTORS.md
- Release notes

Thank you for contributing to BridgeTalk! 🎉
