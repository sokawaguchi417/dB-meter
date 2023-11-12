// このファイルは 'decibel-processor.js' としてサーバーにアップロードします。

class DecibelProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const input = inputs[0];
    let sum = 0;
    let totalSamples = 0;

    // オーディオ処理を行います。ここでは単純に振幅の平方和を計算しています。
    for (let channel = 0; channel < input.length; channel++) {
      const samples = input[channel];
      totalSamples += samples.length;

      for (let i = 0; i < samples.length; i++) {
        sum += samples[i] * samples[i];
      }
    }

    // 平均振幅を計算し、デシベルに変換します。
    const rms = Math.sqrt(sum / totalSamples);
    const db = 20 * (Math.log10(rms));

    // メインスレッドにデシベル値を送信します。
    this.port.postMessage({ db });

    return true;
  }
}

registerProcessor('decibel-processor', DecibelProcessor);

