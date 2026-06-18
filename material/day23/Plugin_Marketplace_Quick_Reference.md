# Marketplace Plugins - Quick Reference Cheat Sheet

## 🚀 QUICKEST START (30 seconds)

```bash
# Step 1: Open plugin manager
/plugin

# Step 2: Go to Discover tab (press Tab)

# Step 3: Find a plugin, select it (arrow keys)

# Step 4: Press Enter to install

# Done! Use it immediately
```

---

## 📋 THREE WAYS TO INSTALL

### Way 1: UI (Easiest - Beginners)
```bash
/plugin
→ Discover tab
→ Select plugin
→ Install

✓ You can see descriptions
✓ Browse graphically
✓ Easy to undo
```

### Way 2: Command Line (Fastest - Experienced)
```bash
/plugin install plugin-name@marketplace-name

# Examples:
/plugin install sap-cap-capire@sap-skills
/plugin install code-review@claude-plugins-official
```

### Way 3: Config File (Team Collaboration)
```json
# In .claude/settings.json
{
  "extraKnownMarketplaces": [
    { "name": "sap-skills", "url": "https://github.com/secondsky/sap-skills" }
  ],
  "plugins": [
    { "name": "sap-cap-capire", "enabled": true }
  ]
}
```

---

## 🌐 COMMON MARKETPLACES

| Name | URL | Use For |
|------|-----|---------|
| Official Anthropic | Built-in | Code review, dev tools, security |
| SAP Skills | `secondsky/sap-skills` | CAP, BTP, Fiori, ABAP |
| Community | `anthropics/claude-plugins-community` | General development |
| Xiaolai Marketplace | `xiaolai/claude-plugin-marketplace` | Various tools |

---

## 📥 ADD MARKETPLACE (Do This First!)

### For SAP Development:
```bash
/plugin marketplace add https://github.com/secondsky/sap-skills
```

### For Community Plugins:
```bash
/plugin marketplace add https://github.com/anthropics/claude-plugins-community
```

✓ Only need to do this ONCE per marketplace

---

## 🎯 POPULAR SAP PLUGINS

### Core CAP Development
```bash
/plugin install sap-cap-capire@sap-skills
```
**Includes:** Data modeling, service implementation, testing

### BTP Deployment
```bash
/plugin install sap-btp-cloud-platform@sap-skills
```
**Includes:** CloudFoundry deployment, environment management

### Fiori UI Development
```bash
/plugin install sap-fiori-tools@sap-skills
```
**Includes:** UI5 scaffolding, Fiori elements templates

### ABAP Development
```bash
/plugin install sap-abap-cds@sap-skills
```
**Includes:** CDS view creation, ABAP patterns

---

## 📱 USEFUL OFFICIAL PLUGINS

### Code Quality
```bash
/plugin install code-review@claude-plugins-official
/plugin install security-guidance@claude-plugins-official
/plugin install frontend-design@claude-plugins-official
```

### Development Workflow
```bash
/plugin install feature-dev@claude-plugins-official
/plugin install commit-commands@claude-plugins-official
```

---

## 📊 PLUGIN MANAGER TABS

### When You Run: `/plugin`

| Tab | What It Shows | What To Do |
|-----|---------------|-----------|
| **Installed** | What you have now | Remove unused ones |
| **Discover** | Available plugins | Browse & install |
| **Marketplaces** | Your connected stores | Add new ones here |
| **Errors** | What went wrong | Troubleshoot |

**Navigation:** Press `Tab` to move between tabs

---

## ⌘ PLUGIN COMMANDS

### Plugin Management
```bash
/plugin                              # Open manager
/plugin list                         # Show installed plugins
/plugin install <name>@<market>      # Install plugin
/plugin uninstall <name>             # Remove plugin
/plugin marketplace add <url>        # Add marketplace
/plugin marketplace remove <name>    # Remove marketplace
/reload-plugins                      # Reload all plugins
```

### After Installing
```bash
/command-name                        # Use plugin commands
# Example: /init-cap-project my-app
```

---

## 🔄 INSTALL SCOPE

```bash
# Install globally (everywhere)
/plugin install name --scope user

# Install in project only (sharable with team)
/plugin install name --scope project
```

**Use `project` scope if:** Sharing with team, want in git
**Use `user` scope if:** Personal tools only

---

## 🛠️ COMPLETE SETUP EXAMPLE

```bash
# 1. Add SAP marketplace
/plugin marketplace add https://github.com/secondsky/sap-skills

# 2. Install SAP plugins
/plugin install sap-cap-capire@sap-skills --scope project
/plugin install sap-btp-cloud-platform@sap-skills --scope project
/plugin install sap-fiori-tools@sap-skills --scope project

# 3. Install development tools
/plugin install code-review@claude-plugins-official
/plugin install security-guidance@claude-plugins-official

# 4. Verify
/plugin list

# 5. Start using
/init-cap-project my-app
```

---

## 📖 HOW PLUGINS WORK

### Skills (Automatic)
```
✓ Activate automatically based on file type
✓ Example: Open db/data-model.cds
  → CDS modeling skill activates
✓ You don't do anything - just work
```

### Commands (Manual)
```
⌘ Invoked with slash (/)
⌘ Example: /init-cap-project
⌘ You see them in autocomplete
```

### Hooks (Automatic Events)
```
🛡️ Run on specific events
🛡️ Example: Run linting on save
🛡️ No user action needed
```

### MCP Servers (Integration)
```
🔌 Connect to external services
🔌 Example: GitHub, SAP APIs
🔌 May require authentication
```

---

## ❌ QUICK FIXES

### Plugin Not Found?
```bash
# Marketplace not added yet
/plugin marketplace add https://github.com/secondsky/sap-skills

# Then try install again
/plugin install sap-cap-capire@sap-skills
```

### Commands Don't Show?
```bash
# Reload plugins
/reload-plugins

# Restart Claude Code completely
```

### Performance Slow?
```bash
# Too many plugins installed
/plugin list

# Remove unused ones
/plugin uninstall unused-plugin-name
```

### See Errors?
```bash
/plugin
# Go to Errors tab
# Check what's wrong
```

---

## 🎓 PLUGIN TERMINOLOGY

| Term | Means | Example |
|------|-------|---------|
| **Marketplace** | A catalog/collection of plugins | sap-skills marketplace |
| **Plugin** | A packaged bundle of extensions | sap-cap-capire plugin |
| **Skill** | Individual instruction set | CDS modeling skill |
| **Command** | Manual invocation with / | /init-cap-project |
| **Hook** | Automatic event trigger | on-file-save |
| **MCP Server** | External service integration | GitHub API |

---

## ✅ VERIFICATION CHECKLIST

After installing a plugin:

- [ ] Plugin appears in `/plugin list`
- [ ] Appears in "Installed" tab in `/plugin`
- [ ] Commands show in `/` autocomplete
- [ ] No errors in "Errors" tab
- [ ] Can successfully run a command
- [ ] Skills activate when working (no errors)

---

## 📊 WHAT'S INSTALLED BY DEFAULT?

```
Marketplaces:
✓ claude-plugins-official (Anthropic)

Plugins:
✓ Internal plugins (core functionality)

Note: Everything else you need to install
```

---

## 🌍 FIND MORE PLUGINS

1. **Official Directory**
   → https://claude.com/plugins

2. **Plugin Hub (Best Search)**
   → https://claudemarketplaces.com

3. **SAP Specific**
   → https://github.com/secondsky/sap-skills

4. **Community**
   → GitHub search: "claude code plugin"

---

## 💡 BEST PRACTICES

✓ **DO:**
- Install only plugins you'll actually use
- Use project scope for team plugins
- Keep plugins updated
- Check plugin descriptions before installing
- Uninstall unused plugins

✗ **DON'T:**
- Install too many at once (slows things down)
- Trust unknown sources without review
- Ignore plugin permissions/requirements
- Mix unrelated plugin marketplaces
- Forget to commit `.claude/settings.json`

---

## 🎯 COMMON WORKFLOWS

### Workflow 1: Quick Installation
```bash
/plugin install sap-cap-capire@sap-skills
# Done! Ready to use
```

### Workflow 2: Team Setup
```bash
# Step 1: Add marketplace
/plugin marketplace add https://github.com/secondsky/sap-skills

# Step 2: Install with project scope
/plugin install sap-cap-capire@sap-skills --scope project

# Step 3: Commit
git add .claude/settings.json
git commit -m "Add CAP dev plugins"

# Step 4: Team pulls and has same setup
```

### Workflow 3: Browse and Install
```bash
/plugin
# Tab → Discover tab
# Find "sap-cap-capire"
# Press Enter
# Select Install
# Done!
```

---

## 📞 GET HELP

### If Plugin Doesn't Work:
1. Check "Errors" tab in `/plugin`
2. Verify marketplace was added: `/plugin marketplace list`
3. Try reinstalling: `/plugin uninstall` then `/plugin install`
4. Check GitHub repo for documentation

### If Command Not Found:
1. Run `/reload-plugins`
2. Check it's in `/plugin list`
3. Verify correct syntax: `/command-name`

### If Performance Issues:
1. Check installed: `/plugin list`
2. Remove MCP-heavy plugins
3. Use `--scope project` for sharing only

---

## 🎬 YOUR NEXT STEP

**Try this RIGHT NOW:**

```bash
# 1. Type this:
/plugin

# 2. Press Tab to see different tabs

# 3. Look at "Installed" to see what you have

# 4. Go to "Discover" to see what's available

# 5. Pick something interesting and explore!

# That's it - you're using the marketplace!
```

---

## 📚 FULL DOCUMENTATION

- Plugin Docs: https://code.claude.com/docs/en/plugins
- Discover Guide: https://code.claude.com/docs/en/discover-plugins
- Create Guide: https://code.claude.com/docs/en/create-plugins

---

**Remember:** First add marketplace → Then install plugins → Then use them! 🚀

