"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useCourtFeesCalculator } from "@/hooks/useLegalCalculators";
import { ArrowLeft, FileText, Info } from "lucide-react";

export default function CourtFeesCalculatorPage() {
    const { input, updateInput, autoResult, errors, disclaimer } = useCourtFeesCalculator({
        caseType: "bosanma",
        courtType: "asliHukuk",
    });
    const [showResult, setShowResult] = useState(false);

    const handleCalculate = () => {
        if (autoResult) {
            setShowResult(true);
        }
    };

    const caseTypes = [
        { value: "bosanma", label: "Boşanma Davası", needsValue: false },
        { value: "velayet", label: "Velayet Davası", needsValue: false },
        { value: "nafaka", label: "Nafaka Davası", needsValue: false },
        { value: "alacak", label: "Alacak Davası", needsValue: true },
        { value: "tazminat", label: "Tazminat Davası", needsValue: true },
        { value: "tapuIptali", label: "Tapu İptali Davası", needsValue: true },
        { value: "kidemTazminati", label: "Kıdem Tazminatı Davası", needsValue: true },
        { value: "iseDavasi", label: "İşe İade Davası", needsValue: false },
        { value: "tahliye", label: "Kiracı Tahliye Davası", needsValue: false },
    ];

    const courtTypes = [
        { value: "asliHukuk", label: "Asliye Hukuk Mahkemesi" },
        { value: "aileMahkemesi", label: "Aile Mahkemesi" },
        { value: "isMahkemesi", label: "İş Mahkemesi" },
        { value: "icraMahkemesi", label: "İcra Mahkemesi" },
    ];

    const selectedCase = caseTypes.find(c => c.value === input.caseType);

    return (
        <div className="bg-slate-50 min-h-screen py-16 pt-28">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link href="/hesaplama" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Tüm Hesaplama Araçları
                </Link>

                <h1 className="text-4xl font-bold text-slate-900 font-playfair mb-4">
                    Dava Harçları Hesaplama
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                    2025 Harçlar Kanunu tarifesiyle dava harçlarını hesaplayın.
                </p>

                <div className="grid lg:grid-cols-2 gap-8">
                    <Card className="p-6">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            Dava Bilgileri
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Dava Türü
                                </label>
                                <select
                                    value={input.caseType || "bosanma"}
                                    onChange={(e) => updateInput({ caseType: e.target.value as typeof input.caseType })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    {caseTypes.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Mahkeme Türü
                                </label>
                                <select
                                    value={input.courtType || "asliHukuk"}
                                    onChange={(e) => updateInput({ courtType: e.target.value as typeof input.courtType })}
                                    className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500 bg-white"
                                >
                                    {courtTypes.map((type) => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedCase?.needsValue && (
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Dava Değeri (TL)
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={input.caseValue || ""}
                                        onChange={(e) => updateInput({ caseValue: parseFloat(e.target.value) || 0 })}
                                        placeholder="Örn: 500000"
                                        className="w-full rounded-lg border border-slate-300 p-3 focus:ring-2 focus:ring-blue-500"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Nispi harç hesabı için dava değeri gereklidir.
                                    </p>
                                </div>
                            )}

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
                                <div className="bg-blue-50 rounded-xl p-6 text-center">
                                    <div className="text-sm text-blue-600 font-semibold mb-1">Toplam Peşin Ödeme</div>
                                    <div className="text-4xl font-bold text-blue-700">
                                        {autoResult.totalAdvancePayment.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                                    </div>
                                    <p className="text-xs text-blue-500 mt-2">Dava açılışında ödenecek tutar</p>
                                </div>

                                <div className="bg-slate-100 rounded-lg p-4">
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Info className="h-4 w-4" />
                                        <span className="font-medium">{autoResult.caseTypeLabel}</span>
                                    </div>
                                    <div className="text-sm text-slate-500 mt-1">
                                        Harç Türü: <span className="font-medium">{autoResult.feeType === "nispi" ? "Nispi Harç" : "Maktu Harç"}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {autoResult.breakdown.map((item, i) => (
                                        <div key={i} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                                            <div>
                                                <span className="text-slate-900">{item.label}</span>
                                                {item.note && (
                                                    <span className="text-xs text-slate-500 block">{item.note}</span>
                                                )}
                                            </div>
                                            <span className="font-semibold text-slate-900">
                                                {item.value.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} TL
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {autoResult.proportionalFee && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-amber-800 text-sm">
                                        <strong>Bakiye Harç:</strong> Dava sonuçlandığında {autoResult.proportionalFee.remainingFee.toLocaleString("tr-TR")} TL ek harç ödenecektir.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-400">
                                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
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
