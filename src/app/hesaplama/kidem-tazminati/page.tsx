"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useSeveranceCalculator } from "@/hooks/useLegalCalculators";
import { ArrowLeft, Calculator, AlertTriangle } from "lucide-react";

export default function SeveranceCalculatorPage() {
    const { input, updateInput, autoResult, errors, disclaimer } = useSeveranceCalculator();
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (autoResult) {
            setShowResult(true);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 pt-28">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Breadcrumb */}
                <Link
                    href="/hesaplama"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Tüm Hesaplama Araçları
                </Link>

                <h1 className="text-4xl font-bold text-slate-900 font-playfair mb-4">
                    Kıdem Tazminatı Hesaplama
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                    2025 güncel tavanıyla kıdem tazminatınızı hesaplayın.
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Calculator className="h-5 w-5 text-blue-600" />
                            Bilgilerinizi Girin
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    İşe Giriş Tarihi
                                </label>
                                <input
                                    type="date"
                                    value={input.startDate || ""}
                                    onChange={(e) => updateInput({ startDate: e.target.value })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    İşten Çıkış Tarihi
                                </label>
                                <input
                                    type="date"
                                    value={input.endDate || ""}
                                    onChange={(e) => updateInput({ endDate: e.target.value })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Brüt Aylık Maaş (TL)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={input.grossSalary || ""}
                                    onChange={(e) => updateInput({ grossSalary: parseFloat(e.target.value) || 0 })}
                                    placeholder="Örn: 45000"
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {errors.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                                    {errors.map((err, i) => (
                                        <div key={i}>{err}</div>
                                    ))}
                                </div>
                            )}

                            <Button onClick={handleCalculate} className="w-full" disabled={!autoResult}>
                                Hesapla
                            </Button>
                        </div>
                    </Card>

                    {/* Result */}
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Sonuç</h2>

                        {showResult && autoResult ? (
                            <div className="space-y-4">
                                {/* Main Result */}
                                <div className="bg-blue-50 rounded-xl p-6 text-center">
                                    <div className="text-sm text-blue-600 font-semibold mb-1">Net Kıdem Tazminatı</div>
                                    <div className="text-4xl font-bold text-blue-700">
                                        {autoResult.netSeverance.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="bg-slate-100 rounded-lg p-4 text-center">
                                    <div className="text-sm text-slate-600">Toplam Çalışma Süresi</div>
                                    <div className="text-lg font-bold text-slate-900">
                                        {autoResult.workDuration.years} yıl {autoResult.workDuration.months} ay {autoResult.workDuration.days} gün
                                    </div>
                                </div>

                                {/* Breakdown */}
                                <div className="space-y-2">
                                    {autoResult.breakdown.map((item, i) => (
                                        <div key={i} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                                            <span className="text-slate-600">{item.label}</span>
                                            <span className="font-semibold text-slate-900">
                                                {item.value.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {autoResult.ceilingApplied && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-sm flex items-start gap-2">
                                        <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                                        <span>
                                            Maaşınız kıdem tazminatı tavanını ({autoResult.ceilingAmount.toLocaleString("tr-TR")} TL) aştığı için tavan tutarı uygulandı.
                                        </span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Bilgilerinizi girip "Hesapla" butonuna tıklayın.</p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 bg-slate-100 rounded-xl p-4 text-sm text-slate-600 text-center">
                    {disclaimer}
                </div>
            </div>
        </div>
    );
}
