window.__ModuleLoader__.load({
  id: 'dsh-plugin-manager',
  factory(require) {
    const React = require('react')
    const h = React.createElement

    const NS = 'dsh-plugin-manager'
    const SELF_PACKAGE = 'dsh-plugin-manager'

    const zh = {
      open: '插件管理',
      title: '插件管理',
      subtitle: '当前已安装的插件，可在此查看版本信息并更新或卸载',
      refresh: '刷新列表',
      close: '关闭',
      update: '更新',
      remove: '卸载',
      updating: '更新中…',
      removing: '卸载中…',
      installed: '已安装',
      builtin: '内置',
      notUpdatable: '该插件随 DSH 提供，不单独更新',
      notRemovable: '该插件随 DSH 提供，不能卸载',
      empty: '暂无已安装的插件',
      loadFailed: '加载插件列表失败',
      remoteUnavailable: '插件管理服务当前不可用',
      unknownError: '操作失败，未返回具体原因',
      updated: '已更新',
      updateAll: '全部更新',
      updatingAll: '正在更新…',
      noUpdatable: '没有可更新的插件',
      updateAllDone: '更新完成',
      failed: '失败',
      newVersion: '有新版本',
      changelog: '更新内容',
      checkingUpdates: '检查更新中…',
      currentVersion: '当前',
      latestVersion: '最新',
      updateNow: '立即更新',
      upToDate: '已是最新',
      removed: '已卸载',
      latest: '已是最新版本',
      restored: '已恢复原版本',
      restartRequired: '已保存，需要重启 DSH 才能生效',
      cancelled: '操作已取消',
      overridden: '该变更被更高优先级的配置覆盖',
      confirmRemove: '确定要卸载吗？该操作会移除插件及其配置行。',
      confirm: '确认卸载',
      cancel: '取消',
      retry: '重试',
      descriptionEmpty: '该插件未提供描述',
      reload: '刷新',
      closeHint: '关闭插件管理',
      loading: '正在加载插件列表…',
    }

    const en = {
      open: 'Plugin Manager',
      title: 'Plugin Manager',
      subtitle: 'Installed plugins with version details; update or remove them here',
      refresh: 'Refresh list',
      close: 'Close',
      update: 'Update',
      remove: 'Remove',
      updating: 'Updating…',
      removing: 'Removing…',
      installed: 'Installed',
      builtin: 'Built-in',
      notUpdatable: 'Provided by DSH itself and updated with it',
      notRemovable: 'Provided by DSH itself and cannot be removed',
      empty: 'No plugins installed',
      loadFailed: 'Failed to load the plugin list',
      remoteUnavailable: 'The plugin management service is unavailable',
      unknownError: 'The operation failed without a reason',
      updated: 'Updated',
      updateAll: 'Update all',
      updatingAll: 'Updating…',
      noUpdatable: 'No updatable plugins',
      updateAllDone: 'Update finished',
      failed: 'failed',
      newVersion: 'New version',
      changelog: "What's new",
      checkingUpdates: 'Checking for updates…',
      currentVersion: 'Current',
      latestVersion: 'Latest',
      updateNow: 'Update now',
      upToDate: 'Up to date',
      removed: 'Removed',
      latest: 'Already up to date',
      restored: 'previous version restored',
      restartRequired: 'Saved; restart DSH for it to take effect',
      cancelled: 'Operation cancelled',
      overridden: 'A higher-priority configuration overrides this change',
      confirmRemove: 'Remove this plugin? Its dependency and configuration row are removed.',
      confirm: 'Remove',
      cancel: 'Cancel',
      retry: 'Retry',
      descriptionEmpty: 'No description provided',
      reload: 'Refresh',
      closeHint: 'Close plugin manager',
      loading: 'Loading plugins…',
    }

    const CSS = [
      '.dshpm-panel{display:inline-flex;align-items:center;justify-content:center;border-radius:8px;color:inherit;cursor:pointer}',
      '.dshpm-panel:hover{background:var(--dsw-alias-bg-layer-2)}',
      '.dshpm-panel:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.dshpm-backdrop{position:fixed;inset:0;z-index:1200;display:flex;align-items:center;justify-content:center;padding:24px;background:color-mix(in srgb,var(--dsw-alias-bg-base) 55%,transparent);backdrop-filter:blur(2px);pointer-events:auto}',
      '.dshpm-dialog{display:flex;flex-direction:column;width:min(780px,100%);max-height:min(82vh,720px);overflow:hidden;border:1px solid var(--dsw-alias-border-l1);border-radius:16px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);box-shadow:0 24px 64px color-mix(in srgb,var(--dsw-alias-label-primary) 20%,transparent);font-family:inherit}',
      '.dshpm-header{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:20px 20px 14px}',
      '.dshpm-heading{min-width:0}',
      '.dshpm-title{font-size:16px;font-weight:600;letter-spacing:.01em}',
      '.dshpm-subtitle{margin-top:4px;font-size:12px;line-height:1.5;color:var(--dsw-alias-label-secondary)}',
      '.dshpm-header-actions{display:flex;align-items:center;gap:6px}',
      '.dshpm-iconbtn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;padding:0;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}',
      '.dshpm-iconbtn:hover:not(:disabled){background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}',
      '.dshpm-iconbtn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.dshpm-iconbtn:disabled{opacity:.5;cursor:default}',
      '.dshpm-spin{animation:dshpm-rotate .9s linear infinite}',
      '@keyframes dshpm-rotate{to{transform:rotate(360deg)}}',
      '.dshpm-notice{margin:0 20px 8px;padding:8px 12px;border-radius:8px;font-size:12px;line-height:1.5;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}',
      '.dshpm-notice-success{background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 12%,transparent);color:var(--dsw-alias-state-success-primary)}',
      '.dshpm-notice-warn{background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 14%,transparent);color:var(--dsw-alias-state-warn-primary)}',
      '.dshpm-error{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 20px 8px;padding:8px 12px;border-radius:8px;font-size:12px;line-height:1.5;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 12%,transparent);color:var(--dsw-alias-state-error-primary)}',
      '.dshpm-body{overflow:auto;border-top:1px solid var(--dsw-alias-border-l1)}',
      '.dshpm-state{display:flex;align-items:center;justify-content:center;min-height:180px;padding:24px;font-size:13px;line-height:1.6;color:var(--dsw-alias-label-secondary);text-align:center}',
      '.dshpm-row{display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px 20px;border-bottom:1px solid var(--dsw-alias-border-l1)}',
      '.dshpm-row:last-child{border-bottom:0}',
      '.dshpm-avatar{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:10px;color:#fff;font-size:13px;font-weight:600;text-transform:uppercase}',
      '.dshpm-action-accent{color:var(--dsw-alias-brand-primary);border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 55%,var(--dsw-alias-border-l2));background:color-mix(in srgb,var(--dsw-alias-brand-primary) 10%,transparent)}',
      '.dshpm-action-accent:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent)}',
      '.dshpm-main{min-width:0}',
      '.dshpm-row-top{display:flex;align-items:center;gap:8px;min-width:0}',
      '.dshpm-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;font-weight:600}',
      '.dshpm-version{flex:none;font-size:11px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}',
      '.dshpm-tag{flex:none;padding:1px 6px;border:1px solid var(--dsw-alias-border-l1);border-radius:999px;font-size:10px;line-height:16px;color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-bg-layer-2)}',
      '.dshpm-pkg{margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--dsw-alias-label-secondary);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}',
      '.dshpm-desc{display:-webkit-box;margin-top:6px;overflow:hidden;font-size:12px;line-height:1.55;color:var(--dsw-alias-label-secondary);-webkit-line-clamp:2;-webkit-box-orient:vertical}',
      '.dshpm-update{display:flex;align-items:center;gap:8px;margin-top:6px;font-size:11px;line-height:1.4}',
      '.dshpm-update-badge{padding:1px 7px;border-radius:999px;background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 16%,transparent);color:var(--dsw-alias-state-warn-primary);border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary) 45%,transparent);font-size:11px;font-weight:700;line-height:15px;white-space:nowrap}',
      '.dshpm-update-version{font-size:11px;font-weight:600;color:var(--dsw-alias-label-primary)}',
      '.dshpm-update-link{border:0;background:none;padding:0;font:inherit;font-size:11px;color:var(--dsw-alias-brand-primary);cursor:pointer}',
      '.dshpm-update-link:hover{text-decoration:underline}',
      '.dshpm-update-muted{color:var(--dsw-alias-label-secondary)}',
      '.dshpm-update-dot{color:var(--dsw-alias-label-secondary)}',
      '.dshpm-update-detail{margin-top:8px;padding:8px 10px;border-radius:8px;background:var(--dsw-alias-bg-layer-2);font-size:11px;line-height:1.55;color:var(--dsw-alias-label-secondary)}',
      '.dshpm-update-detail .dshpm-update-desc{margin-top:4px}',
      '.dshpm-actions{display:flex;align-items:center;gap:8px}',
      '.dshpm-action{height:28px;padding:0 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:7px;background:transparent;color:var(--dsw-alias-label-primary);font:inherit;font-size:12px;line-height:1;cursor:pointer;white-space:nowrap}',
      '.dshpm-action:hover:not(:disabled){background:var(--dsw-alias-bg-layer-2)}',
      '.dshpm-action:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}',
      '.dshpm-action:disabled{opacity:.4;cursor:default}',
      '.dshpm-action-danger{color:var(--dsw-alias-state-error-primary);border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 45%,var(--dsw-alias-border-l2))}',
      '.dshpm-action-danger:hover:not(:disabled){background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent)}',
      '.dshpm-confirm{grid-column:1/-1;display:flex;align-items:center;justify-content:flex-end;gap:8px;padding-top:8px;font-size:12px;color:var(--dsw-alias-label-secondary)}',
      '.dshpm-confirm-text{margin-right:auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
      '@media (max-width:640px){.dshpm-row{grid-template-columns:36px minmax(0,1fr)}.dshpm-actions{grid-column:2;justify-content:flex-end;margin-top:8px}}',
    ].join('\n')

    const store = {
      open: false,
      loading: false,
      bundles: [],
      loaded: false,
      error: '',
      notice: null,
      pending: {},
      confirmRemove: null,
      updatingAll: false,
      updates: {},
      checkingUpdates: false,
      lastUpdateCheck: 0,
    }

    const listeners = new Set()

    function emit() {
      for (const listener of Array.from(listeners)) {
        try {
          listener()
        } catch (error) {
          console.error('[dsh-plugin-manager] listener failed', error)
        }
      }
    }

    function patch(next) {
      Object.assign(store, next)
      emit()
    }

    function useStore() {
      const [, force] = React.useState(0)
      React.useEffect(() => {
        const listener = () => force((value) => value + 1)
        listeners.add(listener)
        return () => {
          listeners.delete(listener)
        }
      }, [])
      return store
    }

    function errorText(error) {
      if (!error) return ''
      if (typeof error === 'string') return error
      if (error.diagnostic) return String(error.diagnostic)
      if (error.data && (error.data.diagnostic || error.data.message)) {
        return String(error.data.diagnostic || error.data.message)
      }
      if (error.message) return String(error.message)
      if (error.code) return String(error.code)
      try {
        return JSON.stringify(error)
      } catch (unused) {
        return ''
      }
    }

    function lastLine(text) {
      if (typeof text !== 'string') return ''
      const lines = text.trim().split(/\r?\n/).filter(Boolean)
      return lines.length > 0 ? lines[lines.length - 1] : ''
    }

    function PluginGlyph(props) {
      const size = (props && props.size) || 16
      return h(
        'svg',
        {
          width: size,
          height: size,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': 'true',
        },
        h('path', {
          d: 'M9 4h6v2.5a2.5 2.5 0 1 0 5 0V4h-1M9 4v3a2 2 0 1 1-4 0V4H4v6h2.5a2.5 2.5 0 1 1 0 5H4v5h6v-2.5a2.5 2.5 0 1 1 5 0V20h5v-5h-2.5a2.5 2.5 0 1 1 0-5H20V4h-5',
        }),
      )
    }

    function RefreshGlyph() {
      return h(
        'svg',
        {
          width: 15,
          height: 15,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.9,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          'aria-hidden': 'true',
        },
        h('path', { d: 'M20 11a8 8 0 1 0-2.34 5.66' }),
        h('path', { d: 'M20 5v6h-6' }),
      )
    }

    function CloseGlyph() {
      return h(
        'svg',
        {
          width: 15,
          height: 15,
          viewBox: '0 0 24 24',
          fill: 'none',
          stroke: 'currentColor',
          strokeWidth: 1.9,
          strokeLinecap: 'round',
          'aria-hidden': 'true',
        },
        h('path', { d: 'M6 6l12 12M18 6L6 18' }),
      )
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        const locale = ctx.get('locale')
        const translate = (() => {
          try {
            return locale ? locale.bind(NS) : null
          } catch (error) {
            return null
          }
        })()

        function activeLocale() {
          if (locale) {
            try {
              return locale.getLocale().active || ''
            } catch (error) {
              /* fall through to the document hint */
            }
          }
          if (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) {
            return document.documentElement.lang
          }
          return (typeof navigator !== 'undefined' && navigator.language) || ''
        }

        function dict() {
          return String(activeLocale()).toLowerCase().startsWith('zh') ? zh : en
        }

        function t(key) {
          if (translate) {
            try {
              const value = translate(key)
              if (value && value !== key) return value
            } catch (error) {
              /* fall through to the bundled dictionary */
            }
          }
          return dict()[key] || key
        }

        function localized(value) {
          if (typeof value === 'string') return value
          if (!value || typeof value !== 'object') return ''
          const active = String(activeLocale()).toLowerCase()
          if (active.startsWith('zh') && typeof value.zh === 'string') return value.zh
          if (typeof value.en === 'string') return value.en
          for (const key of Object.keys(value)) {
            if (typeof value[key] === 'string') return value[key]
          }
          return ''
        }

        function displayName(bundle) {
          return localized(bundle.meta && bundle.meta.title) || bundle.name
        }

        /** Stable per-plugin gradient: same package always gets the same artwork. */
        function avatarStyle(name) {
          let hash = 0
          const text = String(name || '')
          for (let index = 0; index < text.length; index += 1) {
            hash = (hash * 31 + text.charCodeAt(index)) >>> 0
          }
          const hue = hash % 360
          return {
            background:
              'linear-gradient(135deg, hsl(' +
              hue +
              ' 72% 56%), hsl(' +
              ((hue + 48) % 360) +
              ' 72% 44%))',
            color: '#fff',
          }
        }

        function descriptionOf(bundle) {
          const text = localized(bundle.meta && bundle.meta.description) || bundle.description || ''
          const trimmed = String(text).trim()
          if (!trimmed) return t('descriptionEmpty')
          return trimmed.length > 200 ? trimmed.slice(0, 199) + '…' : trimmed
        }

        const remote = () => ctx.get('remote.pluginManager')

        function requireRemote() {
          const endpoint = remote()
          if (!endpoint) throw new Error(t('remoteUnavailable'))
          return endpoint
        }

        /**
         * Client Remote methods answer with a `RemoteResult`: `{ ok: true, value }`
         * or `{ ok: false, error }`. Unwrap it once so callers see the payload.
         */
        function unwrap(result) {
          if (result && typeof result === 'object' && typeof result.ok === 'boolean') {
            if (result.ok) return result.value
            throw new Error(errorText(result.error) || t('unknownError'))
          }
          return result
        }

        function setPending(name, value) {
          const next = Object.assign({}, store.pending)
          if (value) next[name] = value
          else delete next[name]
          patch({ pending: next })
        }

        function setConfirm(name) {
          patch({ confirmRemove: name })
        }

        async function load() {
          patch({ loading: true, error: '' })
          try {
            const all = unwrap(await requireRemote().listBundles())
            const items = (Array.isArray(all) ? all : [])
              .filter((bundle) => bundle && bundle.installed && bundle.name !== SELF_PACKAGE)
              .sort((a, b) => {
                const profileA = a.availability === 'profile' ? 0 : 1
                const profileB = b.availability === 'profile' ? 0 : 1
                if (profileA !== profileB) return profileA - profileB
                return String(a.name).localeCompare(String(b.name))
              })
            patch({ bundles: items, loading: false, loaded: true })
            maybeCheckUpdates(items)
          } catch (error) {
            patch({ loading: false, loaded: true, error: t('loadFailed') + (errorText(error) ? '：' + errorText(error) : '') })
          }
        }

        function compareVersions(left, right) {
          const parse = (value) =>
            String(value)
              .replace(/^v/i, '')
              .split(/[+-]/)[0]
              .split('.')
              .map((part) => parseInt(part, 10) || 0)
          const a = parse(left)
          const b = parse(right)
          const length = Math.max(a.length, b.length)
          for (let index = 0; index < length; index += 1) {
            const x = a[index] || 0
            const y = b[index] || 0
            if (x > y) return 1
            if (x < y) return -1
          }
          return 0
        }

        function setUpdates(name, value) {
          const next = Object.assign({}, store.updates)
          if (value) next[name] = value
          else delete next[name]
          patch({ updates: next })
        }

        function toggleUpdateDetail(name) {
          const current = store.updates[name]
          if (!current) return
          setUpdates(name, Object.assign({}, current, { expanded: !current.expanded }))
        }

        async function checkUpdates(bundles) {
          if (store.checkingUpdates) return
          const market = ctx.get('remote.pluginMarket')
          const candidates = bundles.filter((bundle) => canUpdate(bundle))
          if (candidates.length === 0) return
          const seeded = Object.assign({}, store.updates)
          for (const bundle of candidates) {
            seeded[bundle.name] = { status: 'checking' }
          }
          patch({ updates: seeded, checkingUpdates: true })
          try {
            if (!market) throw new Error('plugin market unavailable')
            const indexes = unwrap(await market.listIndexes())
            const urls = (Array.isArray(indexes) ? indexes : [])
              .map((index) => index && index.url)
              .filter((url) => typeof url === 'string' && url)
            if (urls.length === 0) throw new Error('no market index configured')
            await Promise.all(
              candidates.map(async (bundle) => {
                try {
                  let listing = null
                  const terms = bundle.name.includes('/')
                    ? [bundle.name.slice(bundle.name.lastIndexOf('/') + 1), bundle.name]
                    : [bundle.name]
                  for (const url of urls) {
                    for (const text of terms) {
                      const result = unwrap(
                        await market.search(url, {
                          text,
                          sort: { kind: 'index' },
                          offset: 0,
                          limit: 20,
                        }),
                      )
                      const entries = result && Array.isArray(result.entries) ? result.entries : []
                      listing = entries.find((entry) => entry && entry.name === bundle.name) || null
                      if (listing) break
                    }
                    if (listing) break
                  }
                  if (!listing) {
                    setUpdates(bundle.name, { status: 'unknown' })
                    return
                  }
                  const latestVersion =
                    listing.defaultVersion ||
                    (listing.versions && listing.versions[0] && listing.versions[0].version) ||
                    ''
                  if (!latestVersion) {
                    setUpdates(bundle.name, { status: 'unknown' })
                    return
                  }
                  const currentVersion = bundle.version ? String(bundle.version) : ''
                  const available = currentVersion ? compareVersions(latestVersion, currentVersion) > 0 : true
                  setUpdates(bundle.name, {
                    status: available ? 'available' : 'latest',
                    latestVersion,
                    description: localized(listing.description) || '',
                    expanded: false,
                  })
                } catch (error) {
                  setUpdates(bundle.name, { status: 'unknown' })
                }
              }),
            )
          } catch (error) {
            for (const bundle of candidates) {
              setUpdates(bundle.name, { status: 'unknown' })
            }
          }
          patch({ checkingUpdates: false, lastUpdateCheck: Date.now() })
        }

        function maybeCheckUpdates(bundles) {
          if (store.checkingUpdates) return
          if (store.lastUpdateCheck > 0 && Date.now() - store.lastUpdateCheck < 60000) return
          checkUpdates(bundles)
        }

        function updateSpec(bundle) {
          if (bundle.installTarget && typeof bundle.installTarget.spec === 'string' && bundle.installTarget.spec) {
            return bundle.installTarget.spec
          }
          const source = typeof bundle.source === 'string' ? bundle.source : ''
          if (source) {
            const spec = source.replace(/^(?:file|link):/, '')
            if (spec.startsWith('.') || spec.startsWith('/') || spec.startsWith('~')) return spec
          }
          return bundle.name + '@latest'
        }

        function previousSpec(bundle) {
          if (bundle.installTarget && typeof bundle.installTarget.spec === 'string' && bundle.installTarget.spec) {
            return bundle.installTarget.spec
          }
          const source = typeof bundle.source === 'string' ? bundle.source : ''
          const spec = source.replace(/^(?:file|link):/, '')
          return spec || ''
        }

        function describeResult(result) {
          if (!result) return { kind: 'ok' }
          const application = result.application
          if (application === 'failed') {
            const detail =
              errorText(result.error) ||
              (result.packageResult ? lastLine(result.packageResult.output) : '') ||
              t('unknownError')
            return { kind: 'error', text: detail }
          }
          if (application === 'restart-required') return { kind: 'warn', text: t('restartRequired') }
          if (application === 'cancelled') return { kind: 'warn', text: t('cancelled') }
          if (application === 'overridden') return { kind: 'warn', text: t('overridden') }
          return { kind: 'ok' }
        }

        async function updateOne(bundle) {
          const endpoint = requireRemote()
          const spec = updateSpec(bundle)
          const previous = previousSpec(bundle)
          const label = displayName(bundle)
          let targetVersion = ''
          try {
            const inspection = unwrap(await endpoint.inspect(spec))
            if (inspection && inspection.status === 'accepted' && inspection.version) {
              targetVersion = String(inspection.version)
            }
          } catch (inspectionError) {
            /* inspection is advisory; the install result below decides the outcome */
          }
          if (targetVersion && bundle.version && targetVersion === String(bundle.version)) {
            setUpdates(bundle.name, { status: 'latest', latestVersion: targetVersion })
            return { kind: 'latest', text: t('latest') + ' ' + label }
          }
          const removal = unwrap(await endpoint.removeBundle(bundle.name))
          const removalOutcome = describeResult(removal)
          if (removalOutcome.kind === 'error') {
            return { kind: 'error', text: label + '：' + removalOutcome.text }
          }
          const result = unwrap(await endpoint.installBundle(spec, { enabled: true }))
          const outcome = describeResult(result)
          if (outcome.kind === 'error') {
            let restored = false
            if (previous) {
              try {
                restored =
                  describeResult(unwrap(await endpoint.installBundle(previous, { enabled: true }))).kind !== 'error'
              } catch (rollbackError) {
                restored = false
              }
            }
            return {
              kind: 'error',
              text: label + '：' + outcome.text + (restored ? ' · ' + t('restored') : ''),
            }
          }
          setUpdates(bundle.name, null)
          return {
            kind: outcome.kind === 'warn' ? 'warn' : 'updated',
            text: label + (outcome.kind === 'warn' ? ' · ' + outcome.text : ''),
          }
        }

        async function update(bundle) {
          const name = bundle.name
          if (store.pending[name] || store.updatingAll) return
          setPending(name, 'update')
          patch({ error: '', notice: null })
          try {
            const result = await updateOne(bundle)
            if (result.kind === 'error') {
              patch({ error: t('updated') + ' ' + result.text })
            } else if (result.kind === 'latest') {
              patch({ notice: { kind: 'success', text: result.text } })
            } else {
              patch({
                notice: {
                  kind: result.kind === 'warn' ? 'warn' : 'success',
                  text: t('updated') + ' ' + result.text,
                },
              })
            }
            await load()
          } catch (error) {
            patch({ error: t('updated') + ' ' + displayName(bundle) + '：' + (errorText(error) || t('unknownError')) })
          } finally {
            setPending(name, null)
          }
        }

        async function updateAll() {
          if (store.updatingAll) return
          const targets = store.bundles.filter((bundle) => canUpdate(bundle))
          if (targets.length === 0) {
            patch({ notice: { kind: 'success', text: t('noUpdatable') }, error: '' })
            return
          }
          patch({ updatingAll: true, error: '', notice: null })
          let updated = 0
          let latest = 0
          let failed = 0
          try {
            for (const bundle of targets) {
              setPending(bundle.name, 'update')
              try {
                const result = await updateOne(bundle)
                if (result.kind === 'updated' || result.kind === 'warn') updated += 1
                else if (result.kind === 'latest') latest += 1
                else failed += 1
              } catch (error) {
                failed += 1
              } finally {
                setPending(bundle.name, null)
              }
            }
            patch({
              notice: {
                kind: failed > 0 ? 'warn' : 'success',
                text:
                  t('updateAllDone') +
                  '：' +
                  updated +
                  ' / ' +
                  targets.length +
                  (latest > 0 ? ' · ' + t('latest') + ' ' + latest : '') +
                  (failed > 0 ? ' · ' + t('failed') + ' ' + failed : ''),
              },
            })
          } finally {
            patch({ updatingAll: false })
            await load()
          }
        }

        async function remove(bundle) {
          const name = bundle.name
          if (store.pending[name] || store.updatingAll) return
          setPending(name, 'remove')
          patch({ error: '', notice: null, confirmRemove: null })
          try {
            const result = unwrap(await requireRemote().removeBundle(name))
            const outcome = describeResult(result)
            const label = displayName(bundle)
            if (outcome.kind === 'error') {
              patch({ error: t('removed') + ' ' + label + '：' + outcome.text })
            } else {
              patch({
                notice: {
                  kind: outcome.kind === 'warn' ? 'warn' : 'success',
                  text: t('removed') + ' ' + label + (outcome.kind === 'warn' ? ' · ' + outcome.text : ''),
                },
              })
            }
            await load()
          } catch (error) {
            patch({ error: t('removed') + ' ' + displayName(bundle) + '：' + (errorText(error) || t('unknownError')) })
          } finally {
            setPending(name, null)
          }
        }

        function close() {
          patch({ open: false, confirmRemove: null, error: '', notice: null })
        }

        function openManager() {
          patch({ open: true, confirmRemove: null, error: '', notice: null })
          load()
        }

        function canUpdate(bundle) {
          return bundle.installed !== false && bundle.availability === 'profile'
        }

        function canRemove(bundle) {
          return bundle.removable === true
        }

        function PanelIcon(props) {
          useStore()
          const size = props && typeof props.size === 'number' ? props.size : 16
          return h(
            'span',
            {
              role: 'button',
              tabIndex: 0,
              className: 'dshpm-panel',
              title: t('open'),
              'aria-label': t('open'),
              style: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: size,
                height: size,
                borderRadius: 8,
                color: 'inherit',
                cursor: 'pointer',
              },
              onClick: (event) => {
                event.preventDefault()
                event.stopPropagation()
                openManager()
              },
              onKeyDown: (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  event.stopPropagation()
                  openManager()
                }
              },
            },
            h(PluginGlyph, { size: Math.max(14, size - 2) }),
          )
        }

        function EmptyPanel() {
          React.useEffect(() => {
            openManager()
            const layout = ctx.get('layout')
            if (layout) layout.selectPanel('conversation')
          }, [])
          return null
        }

        function Row(props) {
          const bundle = props.bundle
          const pending = store.pending[bundle.name]
          const confirming = store.confirmRemove === bundle.name
          const updateState = store.updates[bundle.name]
          const hasUpdate = Boolean(updateState && updateState.status === 'available')
          const updatable = canUpdate(bundle)
          const removable = canRemove(bundle)
          const version = bundle.version ? 'v' + bundle.version : '—'
          const initials = String(displayName(bundle)).replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g, '').slice(0, 1) || 'P'

          return h(
            'div',
            { className: 'dshpm-row' },
            h('div', { className: 'dshpm-avatar', 'aria-hidden': 'true', style: avatarStyle(bundle.name) }, initials),
            h(
              'div',
              { className: 'dshpm-main' },
              h(
                'div',
                { className: 'dshpm-row-top' },
                h('span', { className: 'dshpm-name' }, displayName(bundle)),
                h('span', { className: 'dshpm-version' }, version),
                h(
                  'span',
                  { className: 'dshpm-tag' },
                  bundle.availability === 'profile' ? t('installed') : t('builtin'),
                ),
              ),
              h('div', { className: 'dshpm-pkg' }, bundle.name),
              h('div', { className: 'dshpm-desc' }, descriptionOf(bundle)),
              updateState && updateState.status === 'checking'
                ? h(
                    'div',
                    { className: 'dshpm-update' },
                    h('span', { className: 'dshpm-update-muted' }, t('checkingUpdates')),
                  )
                : updateState && updateState.status === 'available'
                  ? h(
                      'div',
                      { className: 'dshpm-update' },
                      h('span', { className: 'dshpm-update-badge' }, t('newVersion')),
                      h('span', { className: 'dshpm-update-version' }, 'v' + updateState.latestVersion),
                      h('span', { className: 'dshpm-update-dot' }, '·'),
                      h(
                        'button',
                        {
                          type: 'button',
                          className: 'dshpm-update-link',
                          onClick: () => toggleUpdateDetail(bundle.name),
                        },
                        t('changelog') + ' ›',
                      ),
                    )
                  : null,
              updateState && updateState.status === 'available' && updateState.expanded
                ? h(
                    'div',
                    { className: 'dshpm-update-detail' },
                    h(
                      'div',
                      null,
                      t('currentVersion') +
                        ' v' +
                        (bundle.version || '—') +
                        '  →  ' +
                        t('latestVersion') +
                        ' v' +
                        updateState.latestVersion,
                    ),
                    updateState.description
                      ? h('div', { className: 'dshpm-update-desc' }, updateState.description)
                      : null,
                    h(
                      'button',
                      {
                        type: 'button',
                        className: 'dshpm-action dshpm-action-accent',
                        style: { marginTop: 8 },
                        disabled: Boolean(pending) || store.updatingAll,
                        onClick: () => update(bundle),
                      },
                      t('updateNow'),
                    ),
                  )
                : null,
            ),
            h(
              'div',
              { className: 'dshpm-actions' },
              h(
                'button',
                {
                  type: 'button',
                  className: 'dshpm-action' + (hasUpdate ? ' dshpm-action-accent' : ''),
                  disabled: !updatable || Boolean(pending) || store.updatingAll || !hasUpdate,
                  title: !updatable
                    ? t('notUpdatable')
                    : hasUpdate
                      ? t('update') + ' ' + displayName(bundle)
                      : updateState && updateState.status === 'checking'
                        ? t('checkingUpdates')
                        : t('upToDate'),
                  onClick: () => update(bundle),
                },
                pending === 'update' ? t('updating') : t('update'),
              ),
              h(
                'button',
                {
                  type: 'button',
                  className: 'dshpm-action dshpm-action-danger',
                  disabled: !removable || Boolean(pending) || store.updatingAll,
                  title: removable ? t('remove') + ' ' + displayName(bundle) : t('notRemovable'),
                  onClick: () => setConfirm(confirming ? null : bundle.name),
                },
                pending === 'remove' ? t('removing') : t('remove'),
              ),
            ),
            confirming
              ? h(
                  'div',
                  { className: 'dshpm-confirm' },
                  h('span', { className: 'dshpm-confirm-text' }, t('confirmRemove')),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dshpm-action',
                      onClick: () => setConfirm(null),
                    },
                    t('cancel'),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dshpm-action dshpm-action-danger',
                      disabled: Boolean(pending),
                      onClick: () => remove(bundle),
                    },
                    t('confirm'),
                  ),
                )
              : null,
          )
        }

        function ManagerOverlay() {
          useStore()
          const open = store.open
          const closeRef = React.useRef(null)
          const dialogRef = React.useRef(null)

          React.useEffect(() => {
            if (!open) return undefined
            const onKeyDown = (event) => {
              if (event.key === 'Escape') {
                event.stopPropagation()
                close()
                return
              }
              if (event.key !== 'Tab' || !dialogRef.current) return
              const focusables = Array.from(
                dialogRef.current.querySelectorAll(
                  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
                ),
              ).filter((element) => element.offsetParent !== null)
              if (focusables.length === 0) return
              const first = focusables[0]
              const last = focusables[focusables.length - 1]
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
              }
            }
            document.addEventListener('keydown', onKeyDown)
            return () => document.removeEventListener('keydown', onKeyDown)
          }, [open])

          React.useEffect(() => {
            if (!open) return undefined
            const timer = setTimeout(() => {
              if (closeRef.current) closeRef.current.focus()
            }, 0)
            return () => clearTimeout(timer)
          }, [open])

          if (!open) return null

          const hasAvailable = Object.keys(store.updates).some((name) => {
            const state = store.updates[name]
            return Boolean(state && state.status === 'available')
          })
          const bundles = store.bundles
          let body = null
          if (store.notice) {
            body = h(
              'div',
              {
                className: 'dshpm-notice dshpm-notice-' + store.notice.kind,
                role: 'status',
                'aria-live': 'polite',
              },
              store.notice.text,
            )
          }
          if (store.error) {
            body = h(
              'div',
              { className: 'dshpm-error', role: 'alert' },
              h('span', null, store.error),
              h('button', { type: 'button', className: 'dshpm-action', onClick: load }, t('retry')),
            )
          }

          return h(
            'div',
            {
              className: 'dshpm-backdrop',
              style: {
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                zIndex: 1200,
                pointerEvents: 'auto',
                background: 'color-mix(in srgb, var(--dsw-alias-bg-base) 55%, transparent)',
              },
              onMouseDown: (event) => {
                if (event.target === event.currentTarget) close()
              },
            },
            h('style', { key: 'dshpm-css' }, CSS),
            h(
              'div',
              {
                className: 'dshpm-dialog',
                role: 'dialog',
                'aria-modal': 'true',
                'aria-labelledby': 'dshpm-title',
                ref: dialogRef,
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  width: 'min(780px, 100%)',
                  maxHeight: 'min(82vh, 720px)',
                  overflow: 'hidden',
                  borderRadius: 16,
                  border: '1px solid var(--dsw-alias-border-l1)',
                  background: 'var(--dsw-alias-bg-layer-1)',
                  color: 'var(--dsw-alias-label-primary)',
                },
              },
              h(
                'header',
                { className: 'dshpm-header' },
                h(
                  'div',
                  { className: 'dshpm-heading' },
                  h('div', { className: 'dshpm-title', id: 'dshpm-title' }, t('title')),
                  h('div', { className: 'dshpm-subtitle' }, t('subtitle')),
                ),
                h(
                  'div',
                  { className: 'dshpm-header-actions' },
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dshpm-action' + (hasAvailable ? ' dshpm-action-accent' : ''),
                      disabled: store.loading || store.updatingAll || !hasAvailable,
                      title: hasAvailable ? t('updateAll') : t('upToDate'),
                      onClick: updateAll,
                    },
                    store.updatingAll ? t('updatingAll') : t('updateAll'),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dshpm-iconbtn',
                      title: t('refresh'),
                      'aria-label': t('refresh'),
                      disabled: store.loading,
                      onClick: load,
                    },
                    h('span', { className: store.loading ? 'dshpm-spin' : undefined }, h(RefreshGlyph)),
                  ),
                  h(
                    'button',
                    {
                      type: 'button',
                      className: 'dshpm-iconbtn',
                      title: t('close'),
                      'aria-label': t('closeHint'),
                      onClick: close,
                      ref: closeRef,
                    },
                    h(CloseGlyph),
                  ),
                ),
              ),
              body,
              h(
                'div',
                { className: 'dshpm-body' },
                store.loading && !store.loaded
                  ? h('div', { className: 'dshpm-state' }, t('loading'))
                  : bundles.length === 0
                    ? h('div', { className: 'dshpm-state' }, t('empty'))
                    : bundles.map((bundle) => h(Row, { key: bundle.name, bundle })),
              ),
            ),
          )
        }

        if (locale) {
          try {
            ctx.effect(() => locale.register(NS, 'zh', zh))
            ctx.effect(() => locale.register(NS, 'en', en))
            ctx.effect(() => locale.subscribe(() => emit()))
          } catch (error) {
            console.error('[dsh-plugin-manager] locale registration failed', error)
          }
        }

        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            {
              name: 'sidebar.panellist',
              id: 'dsh-plugin-manager',
              order: 40,
              label: () => t('open'),
            },
            PanelIcon,
          ),
        )

        ctx.slots.inject('main', () =>
          ctx.slots.register(
            {
              name: 'main',
              key: 'dsh-plugin-manager',
            },
            EmptyPanel,
          ),
        )

        ctx.slots.inject('shell.overlay', () =>
          ctx.slots.register(
            {
              name: 'shell.overlay',
              id: 'dsh-plugin-manager',
            },
            ManagerOverlay,
          ),
        )
      },
    }
  },
})
