<div class="card card-primary card-outline">
  <div class="card-header">
    <div class="d-flex justify-content-between w-100">
      <h3 class="card-title">List Nasabah</h3>
      <div>
        <a href="<?= base_url() ?>Nasabah/export_pdf" class="btn btn-danger btn-sm"><i class="fas fa-file-pdf"></i> Export PDF</a>
        <a href="<?= base_url() ?>Nasabah/export_excel" class="btn btn-info btn-sm"><i class="fas fa-file-upload"></i></i> Import Excel</a>
        <a href="<?= base_url() ?>Nasabah/export_excel" class="btn btn-success btn-sm"><i class="fas fa-file-excel"></i> Export Excel</a>
        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#tambahModal" id="btn-tambah"><i class="fa fa-plus"></i> Tambah</button>
      </div>
    </div>
  </div>
  <!-- /.card-header -->
  <div class="card-body">
    <table id="dt_basic" class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th style="max-width: 50px;">No</th>
          <th>Nama</th>
          <th>No Rekening</th>
          <th>Jenis Asuransi</th>
          <th>Tenggat Waktu</th>
          <th>Keterangan</th>
          <th>status</th>
          <th>Aksi</th>
        </tr>
      </thead>
    </table>
  </div>
  <!-- /.card-body -->
</div>

<!-- view foto -->
<div class="modal fade" id="tambahModal" tabindex="-1" role="dialog" aria-labelledby="tambahModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header outline-info">
        <h5 class="modal-title text-center" id="tambahModalTitle"></h5>
      </div>
      <div class="modal-body">
        <form action="" id="fmain" method="post">
          <input type="hidden" id="id" name="id">
          <div class="row">
            <div class="col-lg-6">
              <div class="form-group">
                <label for="nama">Nama Nasabah</label>
                <input type="text" class="form-control" id="nama" name="nama" placeholder="Nama Nasabah" required />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label for="no_rek">Nomor Rekneing</label>
                <input type="number" class="form-control" id="no_rek" name="no_rek" placeholder="Nomor Rekneing" required />
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label for="jenis_asuransi_id">Jenis Asuransi</label>
                <select name="jenis_asuransi_id" id="jenis_asuransi_id" class="form-control">
                  <?php foreach ($jenis_asuransis as $jenis_asuransi) : ?>
                    <option value="<?= $jenis_asuransi['id'] ?>"><?= $jenis_asuransi['text'] ?></option>
                  <?php endforeach; ?>
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="form-group">
                <label for="tenggat">Tenggang Waktu Pembayaran</label>
                <input type="number" class="form-control" id="tenggat" name="tenggat" placeholder="Tenggang Waktu Pembayaran" required />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="keterangan">Keterangan</label>
            <textarea cols="3" rows="4" class="form-control" id="keterangan" name="keterangan" placeholder="Keterangan"></textarea>
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select name="status" id="status" class="form-control">
              <option value="1">Aktif</option>
              <option value="0">Tidak Aktif</option>
            </select>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary btn-ef btn-ef-3 btn-ef-3c" type="submit" form="fmain"><i class="fa fa-save"></i> Simpan</button>
        <button class="btn btn-success btn-ef btn-ef-3 btn-ef-3c" data-dismiss="modal"><i class="fa fa-arrow-left"></i> Kembali</button>
      </div>
    </div>
  </div>
</div>