import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as SIGN_OFF, c as siteLine, n as COMPANY, t as CALL_DESK } from "./company-BVHhciP6.mjs";
import { d as Printer, p as Phone } from "../_libs/lucide-react.mjs";
import { T as Button, l as Letterhead, u as useAsOf } from "./router-DCeeEZYX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flyer-DscH8N83.js
var import_jsx_runtime = require_jsx_runtime();
var TEL = "0358808766";
var TEL_SHOW = COMPANY.phone;
function FlyerPage() {
	const { asOf } = useAsOf();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print flex flex-wrap items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-ink-soft",
				children: "One page for the client or Khairul. Print landscape."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `tel:+6${TEL}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {}), " Call office"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => window.print(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), " Print"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "print-sheet overflow-hidden rounded-xl bg-panel shadow-docket",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-b border-ink bg-sheet px-5 py-4 sm:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Letterhead, { asOf })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "border-b border-line bg-accent px-5 py-8 text-accent-fg sm:px-8 sm:py-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-[11px] uppercase tracking-[0.22em] text-accent-fg/70",
							children: [
								COMPANY.trade,
								" · ",
								COMPANY.registration
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 max-w-xl font-display text-4xl font-semibold uppercase leading-[0.95] tracking-wide sm:text-5xl",
							children: "MSK plumbing for The Capitol"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-lg text-sm leading-relaxed text-accent-fg/85",
							children: "Gelaran Maju installs and records cold water, sanitary and irrigation on Towers A and B, levels 13 to 31M. Progress is written from the cells — not from a story."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-0 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-6 sm:px-8 sm:py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-[11px] uppercase tracking-[0.18em] text-muted",
								children: "What we do"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-2xl uppercase tracking-wide",
								children: "Three trades. One lock."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-ink-soft",
								children: "Cold water 40%, sanitary 33%, irrigation 8%. The tower lock on the board is the same number Khairul sees. Podium sits on the last certified claim (PC36)."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-4 space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display uppercase text-muted",
											children: "CW"
										}), "Sleeve, pump, transfer, backshaft, tenant cold water."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display uppercase text-muted",
											children: "SAN"
										}), "Tenant outlets, toilet distribution, sanitary toilets and wares."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display uppercase text-muted",
											children: "IRR"
										}), "Outlet, inlet, wiring and panel."]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
						className: "min-h-56 bg-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/site-photos/l27-ta-outlet-1.jpg",
							alt: "L27 Tower A sanitary tenant outlet",
							className: "h-full w-full object-cover"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-px bg-line md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							kicker: "Towers",
							title: "TA and TB",
							body: "Same packages on both towers. A hole on one floor while a higher floor has started is flagged. Work is not skipped quietly."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							kicker: "Evidence",
							title: "Photo on the jump",
							body: "A big jump or a finish needs a picture. L27 TA first and second tenant outlets are already on file. Sub updates wait for a GM check."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							kicker: "Claim",
							title: "Two different claims",
							body: "Sub gaji is Aipoon, Aryan, Kolik. Evaluation claim is the client PC. They are not mixed."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid items-stretch md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figure", {
						className: "min-h-52 bg-paper-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/plans/section.jpg",
							alt: "The Capitol section — basement to helipad",
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-6 sm:px-8 sm:py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-[11px] uppercase tracking-[0.18em] text-muted",
								children: "The building"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 font-display text-2xl uppercase tracking-wide",
								children: "The Capitol"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm leading-relaxed text-ink-soft",
								children: [siteLine(), ". Basement to helipad on the section. Our live board is L13–31M only. Layouts and POs sit under Drawings & PO."]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "border-t border-line px-5 py-6 sm:px-8 sm:py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-[11px] uppercase tracking-[0.18em] text-muted",
							children: "Who to call"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl uppercase tracking-wide",
							children: "Office and site"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 grid gap-3 sm:grid-cols-2",
							children: CALL_DESK.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-lg bg-paper-2 px-3 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-sm uppercase tracking-wide",
										children: row.ping
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[12px] text-muted",
										children: row.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-ink-soft",
										children: row.when
									})
								]
							}, row.when))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[12px] text-muted",
							children: SIGN_OFF.map((s) => `${s.role} ${s.names}`).join(" · ")
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "border-t border-ink bg-ink px-5 py-6 text-paper sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl uppercase tracking-wide",
						children: "Gelaran Maju Sdn Bhd"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-3 text-sm text-paper/80 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: COMPANY.address }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Tel ",
								TEL_SHOW,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									className: "underline decoration-paper/40 underline-offset-2",
									href: `tel:+6${TEL}`,
									children: "Call the office"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								COMPANY.project,
								" · ",
								COMPANY.section,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Internal sheet — not a consumer flyer."
							] })
						]
					})]
				})
			]
		})]
	});
}
function Block({ kicker, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-panel px-5 py-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-[11px] uppercase tracking-[0.18em] text-muted",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-xl uppercase tracking-wide",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-ink-soft",
				children: body
			})
		]
	});
}
//#endregion
export { FlyerPage as component };
