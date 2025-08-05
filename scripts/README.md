# Portfolio Auto-Update Scripts

This directory contains scripts that automatically update the portfolio website with the latest projects from GitHub.

## Scripts

### `update-projects.js`

Fetches the latest 3 repositories from GitHub and updates the "Projetos Recentes" (Recent Projects) section in `src/views/Home.vue`. The script automatically excludes any projects that are already featured in the "Projetos em Destaque" section to avoid duplication.

**Features:**
- Fetches repositories using GitHub API
- Filters out forks, archived repos, and projects in the ignore list
- Gets repository languages and topics for tech tags
- Automatically generates project cards with descriptions and links
- Sorts by most recently updated
- Supports ignoring specific projects via `ignore.json`

**Usage:**
```bash
# Run manually
npm run update-projects

# Run with GitHub token for higher rate limits
GITHUB_TOKEN=your_token npm run update-projects
```

**Environment Variables:**
- `GITHUB_TOKEN` (optional): GitHub personal access token for higher API rate limits

## GitHub Actions

The workflow `.github/workflows/update-projects.yml` automatically:

1. **Runs daily at 12:00 PM UTC**
2. **Fetches latest projects** using the update script
3. **Commits changes** if there are updates
4. **Deploys to GitHub Pages** automatically

### Manual Trigger

You can manually trigger the workflow from GitHub Actions tab:
1. Go to your repository on GitHub
2. Click "Actions" tab
3. Select "Update Latest Projects" workflow
4. Click "Run workflow"

## Configuration

### Changing the Schedule

To change when the automation runs, edit the cron expression in `.github/workflows/update-projects.yml`:

```yaml
schedule:
  # Examples:
  - cron: '0 12 * * *'    # Daily at 12:00 PM UTC
  - cron: '0 9 * * 1'     # Every Monday at 9:00 AM UTC  
  - cron: '0 18 * * 1,3,5' # Mon, Wed, Fri at 6:00 PM UTC
```

### Customizing Project Selection

#### Ignoring Specific Projects

To exclude specific repositories from appearing in your portfolio, add them to the `ignore.json` file in the root directory:

```json
{
  "ignoredProjects": [
    "devgabrielsborges.github.io",
    "old-project",
    "private-experiments",
    "test-repo"
  ],
  "description": "List of GitHub repository names to ignore when fetching latest projects",
  "note": "Add repository names (not full URLs) that you don't want to appear in your portfolio"
}
```

**How it works:**
- Add repository names (not URLs) to the `ignoredProjects` array
- The script automatically excludes these repositories when fetching
- Changes to `ignore.json` are automatically committed by GitHub Actions
- No need to restart any services - changes take effect on next run

#### Advanced Filtering

To modify which projects are included, edit the filter logic in `update-projects.js`:

```javascript
const filteredRepos = repos
  .filter(repo => 
    !repo.fork && // Exclude forks
    !repo.archived && // Exclude archived repos
    repo.name !== `${GITHUB_USERNAME}.github.io` && // Exclude portfolio
    repo.updated_at && // Must have recent activity
    repo.stargazers_count > 0 // Example: only repos with stars
  )
  .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  .slice(0, 3); // Change number of projects here
```

## Troubleshooting

### GitHub API Rate Limits
- Without token: 60 requests/hour
- With token: 5000 requests/hour  
- The script includes delays and efficient API usage

### Common Issues

1. **"Could not find Projetos Recentes section"**
   - The script looks for specific HTML structure in Home.vue
   - Ensure the section exists and hasn't been modified

2. **"GitHub API error: 403"**
   - Rate limit exceeded - wait or add GITHUB_TOKEN
   - Check if repository is public

3. **Changes not appearing**
   - Check GitHub Actions logs
   - Verify the workflow has necessary permissions
   - GitHub Pages may take a few minutes to update

## Manual Deployment

If you need to deploy manually after running the update:

```bash
npm run update-projects  # Update projects
npm run build            # Build the site  
npm run deploy           # Deploy to GitHub Pages
```

Or use the combined command:
```bash
npm run auto-deploy      # Update + build + deploy
```
