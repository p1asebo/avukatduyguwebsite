"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useTaxPenaltyCalculator } from "@/hooks/useLegalCalculators";
import { ArrowLeft, Receipt, TrendingDown, Check } from "lucide-react";

export default function TaxPenaltyCalculatorPage() {
    const { input, updateInput, autoResult, errors, disclaimer } = useTaxPenaltyCalculator({
        includeRestructuring: true,
    });
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (autoResult) {
            setShowResult(true);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen py-16 pt-28">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link href="/hesaplama" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Tüm Hesaplama Araçları
                </Link>

                <h1 className="text-4xl font-bold text-slate-900 font-playfair mb-4">
                    Vergi Gecikme Faizi Hesaplama
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                    Vergi borcu gecikme faizi ve yapılandırma karşılaştırması.
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Receipt className="h-5 w-5 text-blue-600" />
                            Vergi Bilgileri
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Vergi Aslı (TL)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    value={input.taxPrincipal || ""}
                                    onChange={(e) => updateInput({ taxPrincipal: parseFloat(e.target.value) || 0 })}
                                    placeholder="Örn: 50000"
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Vade Tarihi
                                </label>
                                <input
                                    type="date"
                                    value={input.dueDate || ""}
                                    onChange={(e) => updateInput({ dueDate: e.target.value })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Hesaplama Tarihi (Boş bırakılırsa bugün)
                                </label>
                                <input
                                    type="date"
                                    value={input.calculationDate || ""}
                                    onChange={(e) => updateInput({ calculationDate: e.target.value || undefined })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {errors.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                                    {errors.map((err, i) => <div key={i}>{err}</div>)}
                                </div>
                            )}

                            <Button onClick={handleCalculate} className="w-full" disabled={!autoResult}>
                                Hesapla
                            </Button>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Sonuç</h2>

                        {showResult && autoResult ? (
                            <div className="space-y-4">
                                {/* Comparison Cards */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-red-50 rounded-xl p-4 text-center border-2 border-red-100">
                                        <div className="text-xs text-red-600 font-semibold mb-1">Normal Ödeme</div>
                                        <div className="text-2xl font-bold text-red-700">
                                            {autoResult.normalCalculation.totalAmount.toLocaleString("tr-TR")} TL
                                        </div>
                                        <div className="text-xs text-red-500 mt-1">
                                            +{autoResult.normalCalculation.totalInterest.toLocaleString("tr-TR")} TL faiz
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-4 text-center border-2 border-green-200 relative">
                                        {autoResult.restructuringCalculation.savings > 0 && (
                                            <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                <Check className="h-3 w-3" />
                                                Avantajlı
                                            </div>
                                        )}
                                        <div className="text-xs text-green-600 font-semibold mb-1">Yapılandırma</div>
                                        <div className="text-2xl font-bold text-green-700">
                                            {autoResult.restructuringCalculation.totalAmount.toLocaleString("tr-TR")} TL
                                        </div>
                                        <div className="text-xs text-green-500 mt-1">
                                            +{autoResult.restructuringCalculation.yiufeInterest.toLocaleString("tr-TR")} TL Yİ-ÜFE
                                        </div>
                                    </div>
                                </div>

                                {autoResult.restructuringCalculation.savings > 0 && (
                                    <div className="bg-green-100 rounded-lg p-4 text-center">
                                        <div className="flex items-center justify-center gap-2 text-green-700">
                                            <TrendingDown className="h-5 w-5" />
                                            <span className="font-bold text-lg">
                                                {autoResult.restructuringCalculation.savings.toLocaleString("tr-TR")} TL Tasarruf
                                            </span>
                                        </div>
                                        <div className="text-sm text-green-600">
                                            (%{autoResult.restructuringCalculation.savingsPercentage.toFixed(1)} daha az)
                                        </div>
                                    </div>
                                )}

                                <div className="bg-slate-100 rounded-lg p-4 text-sm text-slate-700">
                                    <strong>Öneri:</strong> {autoResult.recommendation}
                                </div>

                                {/* Comparison Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left py-2 text-slate-600"></th>
                                                <th className="text-right py-2 text-red-600">Normal</th>
                                                <th className="text-right py-2 text-green-600">Yapılandırma</th>
                                                <th className="text-right py-2 text-slate-600">Fark</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {autoResult.comparison.map((row, i) => (
                                                <tr key={i} className="border-b last:border-0">
                                                    <td className="py-2 text-slate-700">{row.label}</td>
                                                    <td className="py-2 text-right font-medium">
                                                        {row.normal.toLocaleString("tr-TR")} TL
                                                    </td>
                                                    <td className="py-2 text-right font-medium">
                                                        {row.restructuring.toLocaleString("tr-TR")} TL
                                                    </td>
                                                    <td className={`py-2 text-right font-medium ${row.difference > 0 ? "text-green-600" : ""}`}>
                                                        {row.difference > 0 ? "+" : ""}{row.difference.toLocaleString("tr-TR")} TL
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="text-xs text-slate-500 text-center">
                                    Gecikme süresi: {autoResult.delayMonths} ay
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>Bilgilerinizi girip "Hesapla" butonuna tıklayın.</p>
                            </div>
                        )}
                    </Card>
                </div>

                <div className="mt-8 bg-slate-100 rounded-xl p-4 text-sm text-slate-600 text-center">
                    {disclaimer}
                </div>
            </div>
        </div>
    );
}
